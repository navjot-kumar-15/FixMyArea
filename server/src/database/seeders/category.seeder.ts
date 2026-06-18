import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, DepartmentType } from '../schemas/category.schema';

@Injectable()
export class CategorySeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(CategorySeeder.name);

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Checking categories in the database...');

    const categoriesToSeed = [
      {
        name: 'Pothole',
        description: 'Road damage and potholes needing repair',
        department: DepartmentType.PWD,
        icon: 'road',
        color: '#e74c3c',
        priority_weight: 4,
        sla_hours: 48,
        is_active: true,
      },
      {
        name: 'Water Leakage',
        description: 'Broken water pipes, drainage leakages, or water waste',
        department: DepartmentType.WATER,
        icon: 'tint',
        color: '#3498db',
        priority_weight: 4,
        sla_hours: 24,
        is_active: true,
      },
      {
        name: 'Street Light Outage',
        description:
          'Malfunctioning or dark street lights causing safety issues',
        department: DepartmentType.ELECTRICITY,
        icon: 'lightbulb',
        color: '#f1c40f',
        priority_weight: 3,
        sla_hours: 72,
        is_active: true,
      },
      {
        name: 'Garbage Pileup',
        description: 'Accumulated waste or trash piles requiring collection',
        department: DepartmentType.SANITATION,
        icon: 'trash',
        color: '#2ecc71',
        priority_weight: 3,
        sla_hours: 24,
        is_active: true,
      },
      {
        name: 'Traffic Signal Out',
        description: 'Malfunctioning traffic control signals or signs',
        department: DepartmentType.TRAFFIC,
        icon: 'traffic-light',
        color: '#e67e22',
        priority_weight: 5,
        sla_hours: 12,
        is_active: true,
      },
      {
        name: 'Open Cable Hazard',
        description: 'Exposed wiring or telecom lines causing danger',
        department: DepartmentType.TELECOM,
        icon: 'broadcast-tower',
        color: '#9b59b6',
        priority_weight: 3,
        sla_hours: 48,
        is_active: true,
      },
      {
        name: 'Other Nuisance',
        description: 'General municipal issues not covered elsewhere',
        department: DepartmentType.OTHER,
        icon: 'info-circle',
        color: '#95a5a6',
        priority_weight: 2,
        sla_hours: 120,
        is_active: true,
      },
    ];

    try {
      for (const categoryData of categoriesToSeed) {
        const existingCategory = await this.categoryModel
          .findOne({ name: categoryData.name })
          .exec();
        if (!existingCategory) {
          await this.categoryModel.create(categoryData);
          this.logger.log(`Seeded missing category: ${categoryData.name}`);
        } else {
          await this.categoryModel.updateOne(
            { name: categoryData.name },
            categoryData,
          );
          this.logger.log(`Updated existing category: ${categoryData.name}`);
        }
      }
      this.logger.log('Category seeding completed.');
    } catch (error) {
      this.logger.error('Failed to seed categories', error);
    }
  }
}
