import { ClientSession, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@/shared/services';
import { Project } from '@/projects/projects.schema';
import { CreateProjectDto } from '@/projects/dto/create-project-dto';

export class ProjectsService extends BaseService<Project> {
  constructor(@InjectModel(Project.name) protected readonly projectModel: Model<Project>) {
    super(projectModel);
  }

  addUpdate(createProjectDto: CreateProjectDto) {
    return this.withRetrySession((session: ClientSession) => {
      return this.create(createProjectDto, session);
    });
  }
}
