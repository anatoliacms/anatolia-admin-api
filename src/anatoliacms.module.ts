import {DynamicModule, Module} from '@nestjs/common';
import {ContentTypeModule} from "./content-type/content-type.module";
import {ProjectModule} from "./project/project.module";

@Module({})
export class AnatoliaCMSModule {
    static register(): DynamicModule {
        return {
            module: AnatoliaCMSModule,
            imports: [ProjectModule, ContentTypeModule],
            exports: [ProjectModule, ContentTypeModule]
        }
    }
}