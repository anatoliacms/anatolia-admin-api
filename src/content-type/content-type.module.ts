import {Module} from '@nestjs/common';
import {ContentTypeController} from './content-type.controller';
import {ContentTypeService} from './content-type.service';
import {ShellService} from "../services/shell/shell.service";

@Module({
  controllers: [ContentTypeController],
  providers: [ContentTypeService, ShellService],
})
export class ContentTypeModule {}
