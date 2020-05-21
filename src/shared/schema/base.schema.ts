import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class BaseSchema extends Document {
  @ApiProperty()
  @Prop()
  updatedById: Types.ObjectId;

  @ApiProperty()
  @Prop({ default: false })
  isDeleted: boolean;

  @ApiProperty()
  @Prop()
  deletedById: Types.ObjectId;

  @ApiProperty()
  @Prop()
  deletedAt: Date;

  @ApiProperty()
  @Prop()
  version: string;

  @ApiProperty()
  @Prop()
  lastSyncTime: Date;
}
