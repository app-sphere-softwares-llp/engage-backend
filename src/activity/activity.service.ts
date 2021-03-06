import { Injectable } from '@nestjs/common';
import { BaseService } from '@/shared/services';
import { Activity } from '@/activity/activity.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { CreateActivityDto } from '@/activity/dto/create-activity.dto';
import { User } from '@/users/users.schema';

@Injectable()
export class ActivityService extends BaseService<Activity> {
  constructor(
    @InjectModel(Activity.name) private readonly activityModel: Model<Activity>,
  ) {
    super(activityModel);
  }

  /**
   * create activity
   * creates an activity for time logging
   * @param {CreateActivityDto} dto
   * @param {Partial<User>} loggedInUser
   * @return {Promise<Activity>}
   */
  async createActivity(dto: CreateActivityDto, loggedInUser: Partial<User>): Promise<Activity> {
    const activity: Activity = new this.activityModel(dto);
    activity.createdById = loggedInUser._id;

    return this.withRetrySession(async (session: ClientSession) => {
      return await this.create(activity, session);
    });
  }
}
