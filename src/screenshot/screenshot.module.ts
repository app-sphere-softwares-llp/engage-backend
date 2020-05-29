import { Module } from '@nestjs/common';
import { ScreenshotService } from './screenshot.service';
import { ScreenshotController } from './screenshot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScreenShot, ScreenshotSchema } from '@/screenshot/screenshot.schema';

@Module({
  providers: [ScreenshotService],
  controllers: [ScreenshotController],
  imports: [
    MongooseModule.forFeature([{ name: ScreenShot.name, schema: ScreenshotSchema }])
  ]
})
export class ScreenshotModule {}
