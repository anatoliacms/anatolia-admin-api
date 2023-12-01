import {BadRequestException, Injectable} from '@nestjs/common';
import {ShellService} from "../services/shell.service";
import ProjectDTO from "./project.dto";
import {CommandService} from "../services/command.service";
import {ERRORS} from "../constant";

@Injectable()
export class ProjectService {
  constructor(
      private readonly shellService: ShellService,
      private readonly commandService: CommandService
  ) {
  }

  public create(dto: ProjectDTO) {
    if (this.shellService.isProjectInitialized(dto.name)) {
      throw new BadRequestException(
          ERRORS.PROJECT_ALREADY_INITIALIZED.error,
          {
            cause: new Error(),
            description: ERRORS.PROJECT_ALREADY_INITIALIZED.error,
          },
      );
    }

    // Create a project
    const cmdCreate = this.commandService.createProject(dto.name, dto.name)
    const output = this.shellService.execSync(cmdCreate);

    // Install dependencies
    const cmdPostCreation = this.commandService.postCreation(dto.name)
    this.shellService.execSync(cmdPostCreation);

    return output.toString();
  }

  public up(dto: ProjectDTO) {
    if (!this.shellService.isProjectInitialized(dto.name)) {
      throw new BadRequestException(
          ERRORS.PROJECT_NOT_FOUND.error,
          {
            cause: new Error(),
            description: ERRORS.PROJECT_NOT_FOUND.description,
          },
      );
    }

    const command = this.commandService.up(dto.name);

    const out = this.shellService.execAsync(command);

    return out.toString();
  }

  public listProjects() {
    return this.shellService.listDirectories('./projects');
  }
}
