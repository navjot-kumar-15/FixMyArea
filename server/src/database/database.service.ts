import {
  Injectable,
  Logger,
  OnModuleInit,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    // If the connection is already established before the listener is attached, log it immediately
    if (this.connection.readyState === 1) {
      this.logger.log('Successfully connected to the MongoDB database');
    }

    // Listen for database connection events
    this.connection.on('connected', () => {
      this.logger.log('Successfully connected to the MongoDB database');
    });

    this.connection.on('error', (err) => {
      this.logger.error('Database connection error occurred', err);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('Database connection lost');
    });
  }

  /**
   * A utility method to catch and standardize MongoDB/Mongoose errors.
   * Use this inside a try-catch block in your feature services or in a global ExceptionFilter.
   */
  handleDbError(error: any): never {
    this.logger.error(`Database Exception: ${error.message}`, error.stack);

    // MongoDB Duplicate Key Error
    if (error.name === 'MongoServerError' && error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0];
      throw new ConflictException(
        `${field ? field.charAt(0).toUpperCase() + field.slice(1) : 'Record'} already exists.`
      );
    }

    // Mongoose Validation Error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      throw new ConflictException(`Validation failed: ${messages.join(', ')}`);
    }

    // General exception for any other unhandled DB errors
    throw new InternalServerErrorException('An unexpected database error occurred');
  }
}
