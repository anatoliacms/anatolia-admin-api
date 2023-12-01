import {BadRequestException, Injectable} from '@nestjs/common';
import ContentTypeDto from './content-type.dto';
import {DEFAULT_PROJECT_PATH, DEFAULT_SOURCE_PATH} from '../constant';
import {ShellService} from "../services/shell/shell.service";

@Injectable()
export class ContentTypeService {
  constructor(private readonly shellService: ShellService) {
  }

  public create(contentTypeDto: ContentTypeDto) {
    if (
        this.shellService.isContentTypeInitialized(
            `${DEFAULT_PROJECT_PATH}/${DEFAULT_SOURCE_PATH}`,
            contentTypeDto.name,
        )
    ) {
      throw new BadRequestException('Content type has already initialized.', {
        cause: new Error(),
        description: 'Bad Request',
      });
    }

    const generateContentType = `cd ${this.shellService.getSourcePath(
        contentTypeDto.projectName,
    )} && nccli -n ${contentTypeDto.name} -c '${JSON.stringify(
        contentTypeDto.columns,
    )}'`;

    const out = this.shellService.execSync(generateContentType);
    return out.toString();
  }

  public update(contentTypeDto: ContentTypeDto) {
    const generateContentType = `cd ${this.shellService.getSourcePath(
        contentTypeDto.projectName,
    )} && nccli -n ${contentTypeDto.name} -c '${JSON.stringify(
        contentTypeDto.columns,
    )}'`;

    const out = this.shellService.execSync(generateContentType);
    return out.toString();
  }

  public remove(projectName: string, moduleName: string) {
    const out = this.shellService.execSync(
        `cd ${this.shellService.getSourcePath(
            projectName,
        )} && rm -rf ${moduleName} && nccli --sync`,
    );

    return out.toString();
  }
}
