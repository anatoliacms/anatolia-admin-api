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

  @Post('initialize')
  initProject(@Body() dto: ProjectDTO) {
    return this.getService().initializeProject(dto);
  }

  @Post('run')
  run(@Body() dto: ProjectDTO) {
    return this.getService().run(dto);
  }

  @Get()
  list() {
    return this.getService().listProjects();
  }
}
