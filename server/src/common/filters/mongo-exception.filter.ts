import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';
import { Request, Response } from 'express';

@Catch(MongoServerError, MongooseError.ValidationError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError | MongooseError.ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    // Handle MongoDB Duplicate Key Error
    if (exception instanceof MongoServerError && exception.code === 11000) {
      status = HttpStatus.CONFLICT;
      const field = Object.keys(exception.keyValue || {})[0];
      message = `${field ? field.charAt(0).toUpperCase() + field.slice(1) : 'Record'} already exists.`;
    } 
    // Handle Mongoose Validation Error
    else if (exception instanceof MongooseError.ValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = Object.values(exception.errors).map((err: any) => err.message);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
