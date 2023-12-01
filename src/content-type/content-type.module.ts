import {Module} from '@nestjs/common';
import {ContentTypeController} from './content-type.controller';
import {ContentTypeService} from './content-type.service';
import {ShellService} from "../services/shell.service";
import {CommandService} from "../services/command.service";

@Module({
  controllers: [ContentTypeController],
  providers: [ContentTypeService, ShellService, CommandService],
})
export class ContentTypeModule {}
