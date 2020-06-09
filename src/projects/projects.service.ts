import { ClientSession, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '@/shared/services';
import { Project } from '@/projects/projects.schema';
import { CreateProjectDto } from '@/projects/dto/create-project-dto';
import { User } from '@/users/users.schema';
import { generateUtcDate } from '@/shared/utils';
import { QueryModel } from '@/shared/models';
import { OnModuleInit } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { ModuleRef } from '@nestjs/core';

export class ProjectsService extends BaseService<Project> implements OnModuleInit {
  private userService: UsersService;

  constructor(
    @InjectModel(Project.name) protected readonly projectModel: Model<Project>,
    private moduleRef: ModuleRef,
  ) {
    super(projectModel);
  }

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UsersService.name, { strict: false });
  }

  /**
   * createProject
   * creates a new project with minimum required properties
   * @param dto
   * @param loggedInUser
   */
  async createProject(dto: CreateProjectDto, loggedInUser: Partial<User>): Promise<Project> {
    const newProject = await this.withRetrySession(async (session: ClientSession) => {

      const projectModel = new this.projectModel(dto);
      projectModel.createdById = loggedInUser._id;
      projectModel.startDate = projectModel.startDate || generateUtcDate();
      projectModel.version = 1;

      // create project
      const project = await this.create(projectModel, session) as Project;

      // add project to user's project's array and set it as user's current project
      await this.userService.addProject(loggedInUser._id, project[0]._id, session);

      return project[0];
    });

    // return new created project
    return this.getProjectDetailsById(newProject._id);
  }

  /**
   * editProject
   * edits basic property of project
   * @param dto
   * @param {Partial<User>} loggedInUser
   * @return {Promise<Project>}
   */
  async editProject(dto: CreateProjectDto, loggedInUser: Partial<User>): Promise<Project> {
    const newProject = await this.withRetrySession(async (session: ClientSession) => {

      const projectModel = new this.projectModel(dto);
      projectModel.updatedById = loggedInUser._id;

      // edit project
      return await this.updateById(dto.id.toHexString(), projectModel, session) as Project;
    });

    return this.findById(newProject[0].id);
  }

  /**
   * update project
   * @param {Partial<Project>} project
   * @param {ClientSession} session
   * @return {Promise<Project>}
   */
  async updateProject(project: Partial<Project>, session: ClientSession): Promise<Project> {
    return this.updateById(project._id, project, session);
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

    // find project by id
    return this.findById(
      projectId, query,
    );
  }
}
