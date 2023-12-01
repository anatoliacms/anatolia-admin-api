import {BadRequestException, Injectable} from '@nestjs/common';
import {ShellService} from "../services/shell/shell.service";
import ProjectDTO from "./project.dto";

@Injectable()
export class ProjectService {
  constructor(
      private readonly shellService: ShellService,
  ) {
  }

  public initializeProject(dto: ProjectDTO) {
    if (this.shellService.isProjectInitialized(dto.name)) {
      throw new BadRequestException(
          'Project is already created with given name. Please change working directory or project name.',
          {
            cause: new Error(),
            description: 'Bad Request',
          },
      );
    }

    const output = this.shellService.executeCommand('nest', [
      'new',
      dto.name,
      '-p',
      'npm',
      '-g',
      '--strict',
      '--directory',
      `./projects/${dto.name}`,
    ]);

    //install typeorm dependencies
    this.shellService.execSync(
        `cd ./projects/${dto.name} && npm install --save @nestjs/typeorm typeorm mysql2`,
    );

    return output.stdout.toString();
  }

  public run(dto: ProjectDTO) {
    if (!this.shellService.isProjectInitialized(dto.name)) {
      throw new BadRequestException(
          'Project not found. Please initialize a project.',
          {
            cause: new Error(),
            description: 'Bad Request',
          },
      );
    }

    const command = `cd ./projects/${dto.name} && npm run start`;

    const out = this.shellService.execAsync(command);

    return out.toString();
  }

  public listProjects() {
    return this.shellService.listDirectories('./projects');
  }
}
