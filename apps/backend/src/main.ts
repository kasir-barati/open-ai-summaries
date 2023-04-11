import { Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { json } from 'express';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import corsConfig from './app/configs/cors.config';
import helmetConfig from './app/configs/helmet.config';
import webAppConfig from './app/configs/web-app.config';

async function bootstrap() {
    let swaggerUrl: string;
    const app = await NestFactory.create(AppModule, {});
    const logger = app.get(Logger);

    app.setGlobalPrefix('api/v1');
    app.use(json({ limit: '20mb' }));

    const webAppConfigs = app.get<ConfigType<typeof webAppConfig>>(
        webAppConfig.KEY,
    );
    const corsConfigs = app.get<ConfigType<typeof corsConfig>>(
        corsConfig.KEY,
    );
    const helmetConfigs = app.get<ConfigType<typeof helmetConfig>>(
        helmetConfig.KEY,
    );

    app.use(cookieParser());
    app.enableCors(corsConfigs);
    app.use(helmet(helmetConfigs));

    if (process.env.SWAGGER_PATH) {
        // initialize Swagger using the SwaggerModule class
        const documentBuilderConfig = new DocumentBuilder()
            .setTitle('Open AI Summaries')
            .setDescription(
                'The RESTful API implemented with NestJS and Open AI RESTful API',
            )
            .setVersion('1.0')
            .addTag('open-ai-summaries')
            .build();
        const swaggerDocument = SwaggerModule.createDocument(
            app,
            documentBuilderConfig,
        );

        SwaggerModule.setup(
            webAppConfigs.swaggerPath,
            app,
            swaggerDocument,
        );
        swaggerUrl = `${webAppConfigs.host}:${webAppConfigs.port}${webAppConfigs.swaggerPath}`;
    }

    await app.listen(webAppConfigs.port);
    logger.log(
        `See Swagger or App on: ${
            swaggerUrl
                ? swaggerUrl
                : `${webAppConfigs.host}:${webAppConfigs.port}`
        }`,
        NestApplication.name,
    );
}
bootstrap();
