import { Module } from '@nestjs/common';
import { ProgressUpdateService } from './progress-update.service';
import { ProgressUpdateController } from './progress-update.controller';

@Module({
  providers: [ProgressUpdateService],
  controllers: [ProgressUpdateController],
  exports: [ProgressUpdateService],
})
export class ProgressUpdateModule {}
