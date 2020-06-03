import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from '@/projects/projects.service';
import { CreateProjectDto } from '@/projects/dto/create-project-dto';
import { LoggedInUser } from '@/shared/decorators';
import { User } from '@/users/users.schema';
import { AuthGuard } from '@nestjs/passport';
import { Project } from '@/projects/projects.schema';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create Project' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Project,
  })
  async create(@Body() createProjectDto: CreateProjectDto, @LoggedInUser() user: Partial<User>): Promise<Project> {
    return await this.projectsService.createProject(createProjectDto, user);
  }

  @ApiOperation({ summary: 'Update Project' })
  async update(@Body() createProjectDto: CreateProjectDto, @LoggedInUser() user: Partial<User>) {
    await this.projectsService.createProject(createProjectDto, user);
  }

  // @Get()
  // async findAll(): Promise<User[]> {
  //   // return this.usersService;
  // }
}
