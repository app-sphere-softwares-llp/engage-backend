import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from '@/activity/activity.schema';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
  imports:[
    MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }])
  ]
})
export class ActivityModule {}
