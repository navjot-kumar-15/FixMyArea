import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleType } from '../schemas/role.schema';

@Injectable()
export class RoleSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(RoleSeeder.name);

  constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {}

  async onApplicationBootstrap() {
    this.logger.log('Checking roles in the database...');

    const rolesToSeed = [
      {
        name: RoleType.ADMIN,
        description: 'Administrator with full platform access',
        permissions: [],
        is_active: true,
      },
      {
        name: RoleType.USER,
        description: 'Standard platform user',
        permissions: [],
        is_active: true,
      },
      {
        name: RoleType.WORKER,
        description: 'Worker for service tasks',
        permissions: [],
        is_active: true,
      },
    ];

    try {
      for (const roleData of rolesToSeed) {
        const existingRole = await this.roleModel
          .findOne({ name: roleData.name })
          .exec();
        if (!existingRole) {
          await this.roleModel.create(roleData);
          this.logger.log(`Seeded missing role: ${roleData.name}`);
        }else{
           await this.roleModel.updateOne({ name: roleData.name }, roleData)
          this.logger.log(`Updated missing role: ${roleData.name}`);
        }
      }
      this.logger.log('Role seeding completed.');
    } catch (error) {
      this.logger.error('Failed to seed roles', error);
    }
  }
}
