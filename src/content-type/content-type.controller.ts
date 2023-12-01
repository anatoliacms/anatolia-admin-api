import {Body, Controller, Delete, Param, Post, Put,} from '@nestjs/common';
import {ContentTypeService} from './content-type.service';
import ContentTypeDto from './content-type.dto';

@Controller('content-type')
export class ContentTypeController {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  @Post()
  public create(@Body() contentTypeDto: ContentTypeDto) {
    this.contentTypeService.create(contentTypeDto);
  }

  @Put()
  public update(@Body() contentTypeDto: ContentTypeDto) {
    this.contentTypeService.update(contentTypeDto);
  }

  @Delete(':projectName/:moduleName')
  public get(
    @Param('projectName') projectName: string,
    @Param('moduleName') moduleName: string,
  ) {
    this.contentTypeService.remove(projectName, moduleName);
  }
}
