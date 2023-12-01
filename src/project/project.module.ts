import {Module} from '@nestjs/common';
import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import {ShellService} from "../services/shell.service";
import {CommandService} from "../services/command.service";

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ShellService, CommandService],
})
export class ProjectModule {
}
