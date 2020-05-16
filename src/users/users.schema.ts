import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  emailId: string;

  @ApiProperty()
  @Prop()
  mobileNo: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  currentProjectId: Types.ObjectId;

  @ApiProperty()
  @Prop()
  workDomains: string[];

  @ApiProperty()
  @Prop()
  projects: Types.ObjectId[];

  @ApiProperty()
  @Prop()
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
