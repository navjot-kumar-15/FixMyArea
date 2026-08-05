import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Report } from '../schemas/report.schema';
import { Category } from '../schemas/category.schema';
import { User } from '../schemas/user.schema';

@Injectable()
export class ReportSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(ReportSeeder.name);

  constructor(
    @InjectModel('Report') private readonly reportModel: Model<Report>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Checking reports in the database...');

    try {
      const existingReportsCount = await this.reportModel.countDocuments();
      if (existingReportsCount > 0) {
        this.logger.log(
          `Reports already seeded (${existingReportsCount} existing). Skipping report seed.`,
        );
        return;
      }

      // Fetch existing Category or use fallback ObjectId
      const category = await this.categoryModel.findOne().exec();
      const categoryId = category ? category._id : new Types.ObjectId();

      // Fetch existing User or use fallback ObjectId
      const user = await this.userModel.findOne().exec();
      const userId = user ? user._id : new Types.ObjectId();

      // Sample reports containing ONLY the REQUIRED fields:
      // title, description, category_id, location (with lat & lng object), created_by
      const reportsToSeed = [
        {
          title: 'Deep Pothole near Central Junction',
          description:
            'Large hazardous pothole damaging vehicles and causing traffic slowdown.',
          category_id: categoryId,
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
        await this.reportModel.create(reportData);
        this.logger.log(`Seeded report: "${reportData.title}"`);
      }

      this.logger.log('Report seeding completed.');
    } catch (error) {
      this.logger.error('Failed to seed reports', error);
    }
  }
}
