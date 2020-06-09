import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from '@/projects/projects.service';
import { CreateProjectDto } from '@/projects/dto/create-project-dto';
import { LoggedInUser } from '@/shared/decorators';
import { User } from '@/users/users.schema';
import { AuthGuard } from '@nestjs/passport';
import { Project } from '@/projects/projects.schema';

@ApiTags('Project')
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
  @UsePipes(new ValidationPipe({ groups: ['create'] }))
  async create(@Body() dto: CreateProjectDto, @LoggedInUser() user: Partial<User>): Promise<Project> {
    return await this.projectsService.createProject(dto, user);
  }

  @Post('update')
  @ApiOperation({ summary: 'Update Project' })
  @UsePipes(new ValidationPipe({ groups: ['update'] }))
  async update(@Body() dto: CreateProjectDto, @LoggedInUser() user: Partial<User>) {
    await this.projectsService.editProject(dto, user);
  }
}
