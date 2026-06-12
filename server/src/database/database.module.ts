import { Global, Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getAutoLoadSchemas } from './utils/schema-loader';
import { DatabaseService } from './database.service';
import { ConfigService } from '@nestjs/config';
import { RoleSeeder } from './seeders/role.seeder';
import { CategorySeeder } from './seeders/category.seeder';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
        autoIndex: true,
        autoCreate: true,
        connectionErrorFactory: (error) => {
          const logger = new Logger('DatabaseModule');
          logger.error('Failed to connect to the MongoDB database.', error);
          return error;
        },
      }),
    }),
    // Automatically loads and registers all schemas found in the application
    MongooseModule.forFeature(getAutoLoadSchemas()),
  ],
  providers: [DatabaseService, RoleSeeder, CategorySeeder],
  exports: [MongooseModule, DatabaseService, RoleSeeder, CategorySeeder],
})
export class DatabaseModule {}
