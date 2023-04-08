import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
    MongooseModuleOptions,
    MongooseOptionsFactory,
} from '@nestjs/mongoose';
import webAppConfig from './web-app.config';

export class MongooseModuleConfig implements MongooseOptionsFactory {
    constructor(
        @Inject(webAppConfig.KEY)
        private readonly webAppConfigs: ConfigType<
            typeof webAppConfig
        >,
    ) {}

    createMongooseOptions():
        | MongooseModuleOptions
        | Promise<MongooseModuleOptions> {
        return {
            autoIndex: true,
            autoCreate: true,
            retryAttempts: 10,
            retryDelay: 30,
            useUnifiedTopology: true,
            uri: this.webAppConfigs.databaseUrl,
        };
    }
}
