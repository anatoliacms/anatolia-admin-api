import {Inject, Injectable} from "@nestjs/common";
import {DEFAULT_SOURCE_PATH} from "../constant";
import {AnatoliaConfiguration} from "../anatolia.config";

@Injectable()
export class CommandService {

    constructor(
        @Inject('AnatoliaConfiguration')
        private anatoliaConfiguration: AnatoliaConfiguration,
    ) {
    }

    public createProject(projectName: string, folderName: string) {
        return `nest new ${projectName} -p npm -g --strict --directory ${this.anatoliaConfiguration.workingDirectory}/${folderName}`;
    }

    public postCreation(projectName: string) {
        const anatoliaDependencies = '@anatoliacms/anatolia-common';
        const typeOrmDependencies = "@nestjs/typeorm typeorm";

        return `cd ${this.anatoliaConfiguration.workingDirectory}/${projectName} && npm install --save ${typeOrmDependencies} mysql2 ${anatoliaDependencies}`;
    }

    public up(projectName: string) {
        return `cd ${this.anatoliaConfiguration.workingDirectory}/${projectName} && npm run start`;
    }

    public createContentType(projectName: string, contentTypeName:string, columns: string) {
        return `cd ${this.anatoliaConfiguration.workingDirectory}/${projectName}/${DEFAULT_SOURCE_PATH} && anatolia -n ${contentTypeName} -c '${columns}'`
    }

    public updateContentType(projectName: string, contentTypeName:string, columns: string) {
        return `cd ${this.anatoliaConfiguration.workingDirectory}/${projectName}/${DEFAULT_SOURCE_PATH} && anatolia -n ${contentTypeName} -c '${columns}'`
    }

    public updateContentTypeAndSync(projectName: string, contentTypeName:string) {
        return `cd ${this.anatoliaConfiguration.workingDirectory}/${projectName}/${DEFAULT_SOURCE_PATH} && && rm -rf ${contentTypeName} && anatolia --sync'`
    }
}