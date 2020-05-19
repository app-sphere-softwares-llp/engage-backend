import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '@/projects/projects.schema';
import { ProjectsService } from '@/projects/projects.service';
import { ProjectsController } from '@/projects/projects.controller';


@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {
}
