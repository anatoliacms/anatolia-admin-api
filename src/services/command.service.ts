import {Injectable} from "@nestjs/common";
import {DEFAULT_PROJECT_PATH, DEFAULT_SOURCE_PATH} from "../constant";

@Injectable()
export class CommandService {
    public createProject(projectName: string, folderName: string) {
        return `nest new ${projectName} -p npm -g --strict --directory ${DEFAULT_PROJECT_PATH}/${folderName}`;
    }

    public postCreation(projectName: string) {
        const anatoliaDependencies = '@anatoliacms/anatolia-common';
        const typeOrmDependencies = "@nestjs/typeorm typeorm";

        return `cd ${DEFAULT_PROJECT_PATH}/${projectName} && npm install --save ${typeOrmDependencies} mysql2 ${anatoliaDependencies}`;
    }

    public up(projectName: string) {
        return `cd ${DEFAULT_PROJECT_PATH}/${projectName} && npm run start`;
    }

    public createContentType(projectName: string, contentTypeName:string, columns: string) {
        return `cd ${DEFAULT_PROJECT_PATH}/${projectName}/${DEFAULT_SOURCE_PATH} && anatolia -n ${contentTypeName} -c '${columns}'`
    }

    public updateContentType(projectName: string, contentTypeName:string, columns: string) {
        return `cd ${DEFAULT_PROJECT_PATH}/${projectName}/${DEFAULT_SOURCE_PATH} && anatolia -n ${contentTypeName} -c '${columns}'`
    }

    public updateContentTypeAndSync(projectName: string, contentTypeName:string) {
        return `cd ${DEFAULT_PROJECT_PATH}/${projectName}/${DEFAULT_SOURCE_PATH} && && rm -rf ${contentTypeName} && anatolia --sync'`
    }
}