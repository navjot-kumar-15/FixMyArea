import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, query } = request;
    const userAgent = request.get('user-agent') || '';
    const host = request.get('host') || '';
    const startTime = Date.now();

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length') || 0;
      const duration = Date.now() - startTime;

      const logData = {
        method,
        endpoint: originalUrl,
        statusCode,
        durationMs: duration,
        client: {
          ip,
          userAgent,
          host,
        },
        requestDetails: {
          query,
          contentLength: parseInt(contentLength as string, 10) || 0,
        },
      };

      // this.logger.log(JSON.stringify(logData));\
      this.logger.log(logData);
    });

    next();
  }
}
