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

interface UpdateLocationData {
  name?: string;
  type?: LocationType;
  parent_id?: Types.ObjectId | null;
  geo_location?: {
    type: string;
    coordinates: number[];
  };
  latitude?: number;
  longitude?: number;
  is_active?: boolean;
  is_serviceable?: boolean;
}

interface LocationFilterQuery {
  type?: LocationType;
  parent_id?: Types.ObjectId | null;
  is_active?: boolean;
  is_serviceable?: boolean;
  geo_location?: {
    $nearSphere: {
      $geometry: {
        type: string;
        coordinates: number[];
      };
      $maxDistance: number;
    };
  };
}

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) {}

  private syncGeoData(dto: UpdateLocationData) {
    if (
      dto.geo_location &&
      dto.geo_location.coordinates &&
      dto.geo_location.coordinates.length === 2
    ) {
      if (dto.longitude === undefined || dto.longitude === null) {
        dto.longitude = dto.geo_location.coordinates[0];
      }
      if (dto.latitude === undefined || dto.latitude === null) {
        dto.latitude = dto.geo_location.coordinates[1];
      }
    } else if (
      dto.latitude !== undefined &&
      dto.latitude !== null &&
      dto.longitude !== undefined &&
      dto.longitude !== null
    ) {
      dto.geo_location = {
        type: 'Point',
        coordinates: [dto.longitude, dto.latitude],
      };
    }
  }

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

    const dataToSave: UpdateLocationData = {
      name: nameTrimmed,
      type: createLocationDto.type,
      parent_id: parentId,
      is_active: createLocationDto.is_active,
      is_serviceable: createLocationDto.is_serviceable,
      latitude: createLocationDto.latitude,
      longitude: createLocationDto.longitude,
      geo_location: createLocationDto.geo_location
        ? {
            type: createLocationDto.geo_location.type || 'Point',
            coordinates: createLocationDto.geo_location.coordinates,
          }
        : undefined,
    };

    this.syncGeoData(dataToSave);

    const newLocation = new this.locationModel(dataToSave);
    const saved = await newLocation.save();
    return LocationMapper.toDomain(saved) as ILocation;
  }

  async findAll(filters: {
    type?: LocationType;
    parent_id?: string;
    is_active?: boolean;
    is_serviceable?: boolean;
    longitude?: number;
    latitude?: number;
    radius?: number;
  }): Promise<ILocation[]> {
    const query: LocationFilterQuery = {};

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

    // Geospatial search by latitude and longitude
    if (filters.longitude !== undefined && filters.latitude !== undefined) {
      const maxDistance =
        filters.radius !== undefined ? Number(filters.radius) : 10000; // default 10km in meters
      query.geo_location = {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(filters.longitude), Number(filters.latitude)],
          },
          $maxDistance: maxDistance,
        },
      };
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

    const updateData: UpdateLocationData = {};

    if (updateLocationDto.name !== undefined) {
      updateData.name = updateLocationDto.name.trim();
    }
    if (updateLocationDto.type !== undefined) {
      updateData.type = updateLocationDto.type;
    }
    if (updateLocationDto.is_active !== undefined) {
      updateData.is_active = updateLocationDto.is_active;
    }
    if (updateLocationDto.is_serviceable !== undefined) {
      updateData.is_serviceable = updateLocationDto.is_serviceable;
    }

    // Handle parent_id conversion
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

    // Handle geo-data synchronization on update
    const finalLatitude =
      updateLocationDto.latitude !== undefined
        ? updateLocationDto.latitude
        : location.latitude;
    const finalLongitude =
      updateLocationDto.longitude !== undefined
        ? updateLocationDto.longitude
        : location.longitude;

    if (
      updateLocationDto.geo_location &&
      updateLocationDto.geo_location.coordinates &&
      updateLocationDto.geo_location.coordinates.length === 2
    ) {
      updateData.longitude = updateLocationDto.geo_location.coordinates[0];
      updateData.latitude = updateLocationDto.geo_location.coordinates[1];
      updateData.geo_location = {
        type: updateLocationDto.geo_location.type || 'Point',
        coordinates: updateLocationDto.geo_location.coordinates,
      };
    } else if (
      updateLocationDto.latitude !== undefined ||
      updateLocationDto.longitude !== undefined
    ) {
      if (
        finalLatitude !== undefined &&
        finalLatitude !== null &&
        finalLongitude !== undefined &&
        finalLongitude !== null
      ) {
        updateData.longitude = finalLongitude;
        updateData.latitude = finalLatitude;
        updateData.geo_location = {
          type: 'Point',
          coordinates: [finalLongitude, finalLatitude],
        };
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
