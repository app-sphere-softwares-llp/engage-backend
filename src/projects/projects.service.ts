import { ClientSession, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@/shared/services';
import { Project } from '@/projects/projects.schema';
import { CreateProjectDto } from '@/projects/dto/create-project-dto';
import { User } from '@/users/users.schema';
import { generateUtcDate } from '@/shared/utils';
import { QueryModel } from '@/shared/models';

export class ProjectsService extends BaseService<Project> {
  constructor(@InjectModel(Project.name) protected readonly projectModel: Model<Project>) {
    super(projectModel);
  }

  /**
   * createProject
   * creates a new project with minimum required properties
   * @param createProjectDto
   * @param loggedInUser
   */
  async createProject(createProjectDto: CreateProjectDto, loggedInUser: User): Promise<Project> {
    const newProject = await this.withRetrySession(async (session: ClientSession) => {

      const project = new this.projectModel(createProjectDto);
      project.createdById = loggedInUser._id;
      project.startDate = project.startDate || generateUtcDate();
      project.version = 1;

      return await this.create(project, session);
    });

    return this.findById(newProject[0].id);
  }

  /**
   * getProjectById
   * get project details by id
   * @param projectId
   * @param getFullDetails
   */
  async getProjectDetailsById(projectId: string, getFullDetails: boolean = false) {
    const query = new QueryModel();
    query.lean = true;

    if (getFullDetails) {
      query.populate = [];
    }

    return this.findById(
      projectId, query,
    );
  }
}
