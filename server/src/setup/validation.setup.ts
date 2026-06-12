import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setupValidation(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips out any properties not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error if unexpected properties are sent
      transform: true, // Automatically transforms payloads to DTO class instances
    }),
  );
}
