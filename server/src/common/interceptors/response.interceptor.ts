import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../responses/api-response';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode;

        // If the endpoint already returned our standardized response, do not wrap it again.
        if (data instanceof ApiResponse) {
          if (!data.statusCode) data.statusCode = statusCode;
          return data;
        }

        const success = statusCode >= 200 && statusCode < 300 ? true : false;
        const message = 'Operation successful';

        // Automatically wrap the payload in our standard { status, statusCode, message, data } structure
        return new ApiResponse(success, message, data, statusCode);
      }),
    );
  }
}
