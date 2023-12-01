import {BadRequestException, Injectable} from '@nestjs/common';
import ContentTypeDto from './content-type.dto';
import {DEFAULT_PROJECT_PATH, DEFAULT_SOURCE_PATH, ERRORS} from '../constant';
import {ShellService} from "../services/shell.service";
import {CommandService} from "../services/command.service";

@Injectable()
export class ContentTypeService {
  constructor(
      private readonly shellService: ShellService,
      private readonly commandService: CommandService
  ) {
  }

  public create(contentTypeDto: ContentTypeDto) {
    if (
        this.shellService.isContentTypeInitialized(
            `${DEFAULT_PROJECT_PATH}/${DEFAULT_SOURCE_PATH}`,
            contentTypeDto.name,
        )
    ) {
      throw new BadRequestException(ERRORS.CONTENT_TYPE_ALREADY_INITIALIZED.error, {
        cause: new Error(),
        description: ERRORS.CONTENT_TYPE_ALREADY_INITIALIZED.description,
      });
    }

    const columns = JSON.stringify(contentTypeDto.columns);

    const cmdCreateContentType = this.commandService.createContentType(contentTypeDto.projectName, contentTypeDto.name, columns);

    const out = this.shellService.execSync(cmdCreateContentType);
    return out.toString();
  }

  public update(contentTypeDto: ContentTypeDto) {
    const columns = JSON.stringify(contentTypeDto.columns);

    const cmdUpdateContentType = this.commandService.updateContentType(contentTypeDto.projectName, contentTypeDto.name, columns);

    const out = this.shellService.execSync(cmdUpdateContentType);
    return out.toString();
  }

  public remove(projectName: string, moduleName: string) {
    const cmdUpdateContentTypeAndSync = this.commandService.updateContentTypeAndSync(projectName, moduleName);

    const out = this.shellService.execSync(cmdUpdateContentTypeAndSync);

    return out.toString();
  }
}
