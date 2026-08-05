import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationType } from '../schemas/location.schema';

@Injectable()
export class LocationSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(LocationSeeder.name);

  constructor(
    @InjectModel('Location') private readonly locationModel: Model<Location>,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Checking locations in the database...');

    const locationsToSeed = [
      {
        name: 'Bengaluru',
        type: LocationType.CITY,
        latitude: 12.9716,
        longitude: 77.5946,
        geo_location: {
          type: 'Point',
          coordinates: [77.5946, 12.9716],
        },
        is_active: true,
        is_serviceable: true,
      },
      {
        name: 'Central Junction Area',
        type: LocationType.AREA,
        latitude: 12.9716,
        longitude: 77.5946,
        geo_location: {
          type: 'Point',
          coordinates: [77.5946, 12.9716],
        },
        is_active: true,
        is_serviceable: true,
      },
      {
        name: 'Koramangala 5th Block',
        type: LocationType.AREA,
        latitude: 12.9352,
        longitude: 77.6245,
        geo_location: {
          type: 'Point',
          coordinates: [77.6245, 12.9352],
        },
        is_active: true,
        is_serviceable: true,
      },
      {
        name: 'Jayanagar 4th Block',
        type: LocationType.AREA,
        latitude: 12.925,
        longitude: 77.589,
        geo_location: {
          type: 'Point',
          coordinates: [77.589, 12.925],
        },
        is_active: true,
        is_serviceable: true,
      },
    ];

    try {
      for (const locData of locationsToSeed) {
        const existing = await this.locationModel
          .findOne({ name: locData.name, type: locData.type })
          .exec();
        if (!existing) {
          await this.locationModel.create(locData);
          this.logger.log(`Seeded missing location: ${locData.name}`);
        } else {
          await this.locationModel.updateOne({ _id: existing._id }, locData);
          this.logger.log(`Updated existing location: ${locData.name}`);
        }
      }
      this.logger.log('Location seeding completed.');
    } catch (error) {
      this.logger.error('Failed to seed locations', error);
    }
  }
}
