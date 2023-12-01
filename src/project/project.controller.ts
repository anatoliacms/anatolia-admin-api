import {Body, Controller, Get, Post} from '@nestjs/common';
import {ProjectService} from './project.service';
import ProjectDTO from './project.dto';

@Controller('/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
  }

  protected getService(): ProjectService {
    return this.projectService;
  }

  @Post()
  initProject(@Body() dto: ProjectDTO) {
    return this.getService().create(dto);
  }

  @Post('up')
  run(@Body() dto: ProjectDTO) {
    return this.getService().up(dto);
  }

  @Get('list')
  list() {
    return this.getService().listProjects();
  }
}
