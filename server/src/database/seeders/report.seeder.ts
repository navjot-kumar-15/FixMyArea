import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Report } from '../schemas/report.schema';
import { Category } from '../schemas/category.schema';
import { User } from '../schemas/user.schema';
import { Location, LocationType } from '../schemas/location.schema';

@Injectable()
export class ReportSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(ReportSeeder.name);

  constructor(
    @InjectModel('Report') private readonly reportModel: Model<Report>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Location') private readonly locationModel: Model<Location>,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Checking reports in the database...');

    try {
      // Fetch existing Category or use fallback ObjectId
      const category = await this.categoryModel.findOne().exec();
      const categoryId = category ? category._id : new Types.ObjectId();

      // Fetch existing User or use fallback ObjectId
      const user = await this.userModel.findOne().exec();
      const userId = user ? user._id : new Types.ObjectId();

      // Fetch or create Locations for location_id
      let loc1 = await this.locationModel
        .findOne({ name: 'Central Junction Area' })
        .exec();
      if (!loc1) {
        loc1 = await this.locationModel.create({
          name: 'Central Junction Area',
          type: LocationType.AREA,
          latitude: 12.9716,
          longitude: 77.5946,
          geo_location: { type: 'Point', coordinates: [77.5946, 12.9716] },
        });
      }

      let loc2 = await this.locationModel
        .findOne({ name: 'Koramangala 5th Block' })
        .exec();
      if (!loc2) {
        loc2 = await this.locationModel.create({
          name: 'Koramangala 5th Block',
          type: LocationType.AREA,
          latitude: 12.9352,
          longitude: 77.6245,
          geo_location: { type: 'Point', coordinates: [77.6245, 12.9352] },
        });
      }

      let loc3 = await this.locationModel
        .findOne({ name: 'Jayanagar 4th Block' })
        .exec();
      if (!loc3) {
        loc3 = await this.locationModel.create({
          name: 'Jayanagar 4th Block',
          type: LocationType.AREA,
          latitude: 12.925,
          longitude: 77.589,
          geo_location: { type: 'Point', coordinates: [77.589, 12.925] },
        });
      }

      // Sample reports containing required fields + location_id:
      const reportsToSeed = [
        {
          title: 'Deep Pothole near Central Junction',
          description:
            'Large hazardous pothole damaging vehicles and causing traffic slowdown.',
          category_id: categoryId,
          location_id: loc1._id,
          location: {
            type: 'Point',
            coordinates: {
              lat: 12.9716,
              lng: 77.5946,
            },
          },
          created_by: userId,
        },
        {
          title: 'Water Pipe Leakage on 5th Main',
          description:
            'Clean water gushing out onto the main road from a broken municipal pipe.',
          category_id: categoryId,
          location_id: loc2._id,
          location: {
            type: 'Point',
            coordinates: {
              lat: 12.9352,
              lng: 77.6245,
            },
          },
          created_by: userId,
        },
        {
          title: 'Broken Streetlight Grid #12',
          description:
            'Multiple streetlights out for over 3 days, making the lane unsafe at night.',
          category_id: categoryId,
          location_id: loc3._id,
          location: {
            type: 'Point',
            coordinates: {
              lat: 12.925,
              lng: 77.589,
            },
          },
          created_by: userId,
        },
      ];

      for (const reportData of reportsToSeed) {
        // Prevent creating duplicate reports (check by title)
        const existing = await this.reportModel
          .findOne({ title: reportData.title })
          .exec();

        if (!existing) {
          await this.reportModel.create(reportData);
          this.logger.log(`Seeded missing report: "${reportData.title}"`);
        } else {
          await this.reportModel.updateOne({ _id: existing._id }, reportData);
          this.logger.log(
            `Updated existing report: "${reportData.title}" (duplicate avoided)`,
          );
        }
      }

      this.logger.log('Report seeding completed.');
    } catch (error) {
      this.logger.error('Failed to seed reports', error);
    }
  }
}
