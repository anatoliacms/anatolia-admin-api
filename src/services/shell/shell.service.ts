import {Injectable} from '@nestjs/common';
import {exec, execSync, spawnSync} from 'child_process';
import {readdir} from 'fs/promises';
import {DEFAULT_PROJECT_PATH, DEFAULT_SOURCE_PATH} from "../../constant";
import fs = require('fs');

@Injectable()
export class ShellService {
  executeCommand(command: string, args?: string[]) {
    return spawnSync(command, args);
  }

  execSync(command: string) {
    return execSync(command);
  }

  execAsync(command: string) {
    return exec(command);
  }

  isProjectInitialized(projectName: string): boolean {
    return fs.existsSync(`./projects/${projectName}`);
  }

  isContentTypeInitialized(
    defaultPath: string,
    contentTypeName: string,
  ): boolean {
    return fs.existsSync(`${defaultPath}/${contentTypeName.toLowerCase()}`);
  }

  async listDirectories(path: string) {
    return (await readdir(path, { withFileTypes: true }))
      .filter((dirent) => dirent.isDirectory())
      .map((dir) => dir.name);
  }

  private formatCode() {
    console.log('code formattion')
    execSync('npm run format')
  }

  public getSourcePath(projectName: string) {
    return `${DEFAULT_PROJECT_PATH}/${projectName}/${DEFAULT_SOURCE_PATH}`
  }
}
