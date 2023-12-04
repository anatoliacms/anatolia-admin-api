import {DynamicModule, Module} from '@nestjs/common';
import {ContentTypeModule} from "./content-type/content-type.module";
import {ProjectModule} from "./project/project.module";
import {AnatoliaConfiguration} from "./anatolia.config";

@Module({})
export class AnatoliaCMSModule {
    static register(anatoliaConfiguration: AnatoliaConfiguration): DynamicModule {
        return {
            module: AnatoliaCMSModule,
            providers: [
                {
                    provide: 'AnatoliaConfiguration',
                    useValue: anatoliaConfiguration,
                }
            ],
            imports: [
                ProjectModule.register(anatoliaConfiguration),
                ContentTypeModule.register(anatoliaConfiguration)
            ],
            exports: [ProjectModule, ContentTypeModule]
        }
    }
}