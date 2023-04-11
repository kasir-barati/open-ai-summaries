import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { registerAs } from '@nestjs/config';

// allowedOrigins restrict requests from unusual source
const allowedOrigins = [
    'http://localhost:5000',
    'http://localhost:5173',
    'http://127.0.0.1:5000',
];

export default registerAs(
    'corsConfigs',
    (): CorsOptions => ({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) {
                return callback(null, true);
            }
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
                    'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    }),
);
