import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { registerAs } from '@nestjs/config';

// allowedOrigins restrict requests from unusual source

export default registerAs(
    'corsConfigs',
    (): CorsOptions => ({
        origin: '*',
    }),
);
