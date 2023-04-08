import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { json } from 'express';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import corsConfig from './app/configs/cors.config';
import helmetConfig from './app/configs/helmet.config';
import webAppConfig from './app/configs/web-app.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });

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
            .setTitle('Headless weblog')
            .setDescription(
                'The Headless RESTful API implemented in Prisma and NestJS',
            )
            .setVersion('1.0')
            .addTag('weblog')
            .addBearerAuth({
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            })
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
    }

    await app.listen(webAppConfigs.port);
}
bootstrap();
