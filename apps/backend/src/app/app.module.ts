import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { SummaryModule } from '../modules/summary/summary.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import corsConfig from './configs/cors.config';
import helmetConfig from './configs/helmet.config';
import { MongooseModuleConfig } from './configs/mongoose.config';
import webAppConfig from './configs/web-app.config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule.forFeature(webAppConfig)],
            useClass: MongooseModuleConfig,
        }),
        ConfigModule.forRoot({
            envFilePath: [join(process.cwd(), '..', '..', '.env')],
            load: [webAppConfig, corsConfig, helmetConfig],
            cache: true,
        }),
        SummaryModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
