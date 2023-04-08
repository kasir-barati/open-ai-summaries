import { registerAs } from '@nestjs/config';
import { plainToInstance, Type } from 'class-transformer';
import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    validateSync,
} from 'class-validator';
import { NodeEnv } from 'shared/types/node-env';
import { webAppConfigs } from '../web-app.type';

export default registerAs('webAppConfigs', (): webAppConfigs => {
    const validatedEnvs = validate(process.env);

    const config: webAppConfigs = {
        nodeEnv: validatedEnvs.NODE_ENV,
        sa: {
            username: validatedEnvs.SA_USERNAME,
            password: validatedEnvs.SA_PASSWORD,
        },
        host: validatedEnvs.APP_HOST,
        port: validatedEnvs.APP_PORT,
        exposedPort: validatedEnvs.APP_EXPOSED_PORT,
        swaggerPath: validatedEnvs.SWAGGER_PATH,
        databaseUrl: validatedEnvs.DATABASE_URL,
        baseUrl: validatedEnvs.BASE_URL,
    };

    return config;
});

class EnvironmentVariables {
    @IsOptional()
    @IsEnum(NodeEnv)
    NODE_ENV: NodeEnv = NodeEnv.development;

    @IsOptional()
    @IsString()
    SA_USERNAME?: string;

    @IsOptional()
    @IsString()
    SA_PASSWORD?: string;

    @IsOptional()
    @IsString()
    APP_HOST: string = 'localhost';

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    APP_PORT: number = 3000;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    APP_EXPOSED_PORT: number = 5000;

    @IsOptional()
    @IsString()
    SWAGGER_PATH: string = 'docs';

    @IsString()
    DATABASE_URL: string;

    @IsOptional()
    @IsString()
    BASE_URL?: string;
}

function validate(config: Record<string, unknown>) {
    const validatedConfigs = plainToInstance(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true },
    );
    const validatedConfigsErrors = validateSync(validatedConfigs, {
        skipMissingProperties: false,
    });

    if (validatedConfigsErrors.length > 0) {
        // FIXME:
        // console.dir({
        //     errors: validatedConfigsErrors.map((error) => ({
        //         value: error.value,
        //         property: error.property,
        //         message: Object.values(error.constraints!)[0],
        //     })),
        //     message:
        //         'Application could not load required environment variables',
        // });
        throw new Error(validatedConfigsErrors.toString());
    }

    return validatedConfigs;
}
