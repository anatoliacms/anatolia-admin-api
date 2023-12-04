import {DynamicModule, Module} from '@nestjs/common';
import {ContentTypeController} from './content-type.controller';
import {ContentTypeService} from './content-type.service';
import {ShellService} from "../services/shell.service";
import {CommandService} from "../services/command.service";
import {AnatoliaConfiguration} from "../anatolia.config";

@Module({})
export class ContentTypeModule {
  static register(anatoliaConfiguration: AnatoliaConfiguration): DynamicModule {
    return {
      module: ContentTypeModule,
      providers: [
        ContentTypeService,
        ShellService,
        CommandService,
        {
          provide: 'AnatoliaConfiguration',
          useValue: anatoliaConfiguration,
        }
      ],
      controllers: [ContentTypeController]
    }
  }
}
