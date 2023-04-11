import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import { OpenaiWrapperConfig } from '../openai-wrapper.type';

export default registerAs(
    'openaiWrapperConfigs',
    (): OpenaiWrapperConfig => {
        const validatedEnvs = validate(process.env);
        const config: OpenaiWrapperConfig = {
            openaiApiKey: validatedEnvs.OPENAI_API_KEY,
        };

        return config;
    },
);

class EnvironmentVariables {
    @IsString()
    OPENAI_API_KEY: string;
}

function validate(
    config: Record<string, unknown>,
): EnvironmentVariables {
    const validatedConfigs = plainToInstance(
        EnvironmentVariables,
        config,
        {
            enableImplicitConversion: true,
        },
    );
    const validatedConfigsErrors = validateSync(validatedConfigs, {
        skipMissingProperties: false,
    });

    if (validatedConfigsErrors.length > 0) {
        throw new Error(validatedConfigsErrors.toString());
    }

    return validatedConfigs;
}
