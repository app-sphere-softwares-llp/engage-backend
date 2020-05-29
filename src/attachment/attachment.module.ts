import { Module } from '@nestjs/common';
import { AttachmentController } from './attachment.controller';
import { AttachmentService } from './attachment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Attachment, AttachmentSchema } from '@/attachment/attachment.schema';

@Module({
  controllers: [AttachmentController],
  providers: [AttachmentService],
  imports:[
    MongooseModule.forFeature([{ name: Attachment.name, schema: AttachmentSchema }])
  ]
})
export class AttachmentModule {}
