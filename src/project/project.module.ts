import {Module} from '@nestjs/common';
import {ProjectController} from './project.controller';
import {ProjectService} from './project.service';
import {ShellService} from "../services/shell/shell.service";

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ShellService],
})
export class ProjectModule {
}
