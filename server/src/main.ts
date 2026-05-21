import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './setup/swagger.setup';
import { setupValidation } from './setup/validation.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Initialize setup configurations
  setupValidation(app);
  setupSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3000;

  await app.listen(port);
  Logger.log(`🚀 Server is running on port: ${port}`, 'Bootstrap');
  Logger.log(`📚 Swagger documentation is available at: http://localhost:${port}/api/docs`, 'Bootstrap');
}
bootstrap();
