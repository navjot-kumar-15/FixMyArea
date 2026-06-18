import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Location, LocationType } from '../../database/schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ILocation } from './interfaces/location.interface';
import { LocationMapper } from './mapper/location.mapper';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<ILocation> {
    const nameTrimmed = createLocationDto.name.trim();
    const parentId = createLocationDto.parent_id
      ? new Types.ObjectId(createLocationDto.parent_id)
      : null;

    // Verify parent exists if parent_id is provided
    if (parentId) {
      const parentExists = await this.locationModel.findById(parentId).exec();
      if (!parentExists) {
        throw new NotFoundException(
          `Parent location with ID "${createLocationDto.parent_id}" not found.`,
        );
      }
    }

    // Check for duplicate location (same name, type, and parent_id)
    const existing = await this.locationModel
      .findOne({
        name: { $regex: new RegExp(`^${nameTrimmed}$`, 'i') },
        type: createLocationDto.type,
        parent_id: parentId,
      })
      .exec();

    if (existing) {
      throw new ConflictException(
        `Location with name "${createLocationDto.name}" under this parent and type already exists.`,
      );
    }

    const newLocation = new this.locationModel({
      ...createLocationDto,
      name: nameTrimmed,
      parent_id: parentId,
    });

    const saved = await newLocation.save();
    return LocationMapper.toDomain(saved) as ILocation;
  }

  async findAll(filters: {
    type?: LocationType;
    parent_id?: string;
    is_active?: boolean;
    is_serviceable?: boolean;
  }): Promise<ILocation[]> {
    const query: any = {};

    if (filters.type) {
      query.type = filters.type;
    }

    if (filters.parent_id !== undefined) {
      query.parent_id = filters.parent_id
        ? new Types.ObjectId(filters.parent_id)
        : null;
    }

    if (filters.is_active !== undefined) {
      query.is_active = filters.is_active;
    }

    if (filters.is_serviceable !== undefined) {
      query.is_serviceable = filters.is_serviceable;
    }

    const locations = await this.locationModel.find(query).exec();
    return LocationMapper.toDomainList(locations);
  }

  async findOne(id: string): Promise<ILocation> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid MongoDB ID "${id}".`);
    }
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException(`Location with ID "${id}" not found.`);
    }
    return LocationMapper.toDomain(location) as ILocation;
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<ILocation> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid MongoDB ID "${id}".`);
    }

    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException(`Location with ID "${id}" not found.`);
    }

    const updateData: any = { ...updateLocationDto };

    // Handle name trim and parent_id conversion
    if (updateLocationDto.name) {
      updateData.name = updateLocationDto.name.trim();
    }

    if (updateLocationDto.parent_id !== undefined) {
      if (updateLocationDto.parent_id === null) {
        updateData.parent_id = null;
      } else {
        if (!Types.ObjectId.isValid(updateLocationDto.parent_id)) {
          throw new BadRequestException(
            `Invalid Parent MongoDB ID "${updateLocationDto.parent_id}".`,
          );
        }
        // Prevent setting itself as parent
        if (updateLocationDto.parent_id === id) {
          throw new BadRequestException('A location cannot be its own parent.');
        }
        const parentExists = await this.locationModel
          .findById(updateLocationDto.parent_id)
          .exec();
        if (!parentExists) {
          throw new NotFoundException(
            `Parent location with ID "${updateLocationDto.parent_id}" not found.`,
          );
        }
        updateData.parent_id = new Types.ObjectId(updateLocationDto.parent_id);
      }
    }

    // Check conflict if name, type, or parent_id changes
    const nameToCheck =
      updateData.name !== undefined ? updateData.name : location.name;
    const typeToCheck =
      updateData.type !== undefined ? updateData.type : location.type;
    const parentToCheck =
      updateData.parent_id !== undefined
        ? updateData.parent_id
        : location.parent_id;

    if (
      updateData.name !== undefined ||
      updateData.type !== undefined ||
      updateData.parent_id !== undefined
    ) {
      const conflict = await this.locationModel
        .findOne({
          _id: { $ne: id },
          name: { $regex: new RegExp(`^${nameToCheck}$`, 'i') },
          type: typeToCheck,
          parent_id: parentToCheck,
        })
        .exec();

      if (conflict) {
        throw new ConflictException(
          `Another location with name "${nameToCheck}" under the same parent and type already exists.`,
        );
      }
    }

    const updated = await this.locationModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    return LocationMapper.toDomain(updated) as ILocation;
  }

  async remove(id: string): Promise<ILocation> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid MongoDB ID "${id}".`);
    }

    // Prevent deletion if this location has sub-locations
    const hasChildren = await this.locationModel
      .findOne({ parent_id: new Types.ObjectId(id) })
      .exec();
    if (hasChildren) {
      throw new ConflictException(
        'Cannot delete a location that has sub-locations.',
      );
    }

    const deleted = await this.locationModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Location with ID "${id}" not found.`);
    }
    return LocationMapper.toDomain(deleted) as ILocation;
  }
}
