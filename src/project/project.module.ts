import {DynamicModule, Module} from '@nestjs/common';
import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import {ShellService} from "../services/shell.service";
import {CommandService} from "../services/command.service";
import {AnatoliaConfiguration} from "../anatolia.config";
import {ContentTypeService} from "../content-type/content-type.service";
import {ContentTypeController} from "../content-type/content-type.controller";

@Module({})
export class ProjectModule {
  static register(anatoliaConfiguration: AnatoliaConfiguration): DynamicModule {
    return {
      module: ProjectModule,
      providers: [
        ProjectService,
        ShellService,
        CommandService,
        {
          provide: 'AnatoliaConfiguration',
          useValue: anatoliaConfiguration,
        }
      ],
      controllers: [ProjectController]
    }
  }
}
