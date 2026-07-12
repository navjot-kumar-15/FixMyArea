import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from '../schemas/tag.schema';

@Injectable()
export class TagSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(TagSeeder.name);

  constructor(
    @InjectModel('Tag') private readonly tagModel: Model<Tag>,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Checking tags in the database...');

    const tagsToSeed = [
      {
        name: 'Urgent',
        description: 'Requires immediate attention due to safety or high impact',
        color: '#e74c3c',
        is_active: true,
      },
      {
        name: 'Hazard',
        description: 'Presents physical danger to the public (e.g. open wires, falling debris)',
        color: '#d35400',
        is_active: true,
      },
      {
        name: 'Road Safety',
        description: 'Issues impacting traffic and driving conditions',
        color: '#f39c12',
        is_active: true,
      },
      {
        name: 'Sanitation',
        description: 'Cleanliness, garbage pileup, or hygiene-related issues',
        color: '#27ae60',
        is_active: true,
      },
      {
        name: 'Water Supply',
        description: 'Pipe leaks, drainage overflows, or water contamination',
        color: '#2980b9',
        is_active: true,
      },
      {
        name: 'Electricity',
        description: 'Power outages, broken wires, or street light issues',
        color: '#f1c40f',
        is_active: true,
      },
      {
        name: 'Infrastructure',
        description: 'Damages to pavements, public buildings, or bridges',
        color: '#8e44ad',
        is_active: true,
      },
      {
        name: 'Encroachment',
        description: 'Illegal blocking of public footpaths, roads, or properties',
        color: '#c0392b',
        is_active: true,
      },
      {
        name: 'Environment',
        description: 'Pollution, tree falling, or damage to nature/parks',
        color: '#16a085',
        is_active: true,
      },
      {
        name: 'Community',
        description: 'General improvements or requests for neighborhood welfare',
        color: '#2c3e50',
        is_active: true,
      },
    ];

    try {
      for (const tagData of tagsToSeed) {
        const existingTag = await this.tagModel
          .findOne({ name: { $regex: new RegExp(`^${tagData.name.trim()}$`, 'i') } })
          .exec();
        if (!existingTag) {
          await this.tagModel.create(tagData);
          this.logger.log(`Seeded missing tag: ${tagData.name}`);
        } else {
          await this.tagModel.updateOne(
            { _id: existingTag._id },
            tagData,
          );
          this.logger.log(`Updated existing tag: ${tagData.name}`);
        }
      }
      this.logger.log('Tag seeding completed.');
    } catch (error) {
      this.logger.error('Failed to seed tags', error);
    }
  }
}
