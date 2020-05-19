import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsService } from '@/projects/projects.service';
import { CreateProjectDto } from '@/projects/dto/create-project-dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    await this.projectsService.addUpdate(createProjectDto);
  }

  // @Get()
  // async findAll(): Promise<User[]> {
  //   // return this.usersService;
  // }
}
