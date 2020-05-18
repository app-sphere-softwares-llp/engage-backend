import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true, id: true, toJSON: { virtuals: true, getters: true, versionKey: false } })
export class BaseSchema extends Document {
  @ApiProperty()
  @Prop({ required: ['Created by is required'] })
  createdById: Types.ObjectId;

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
}
