import { NodeEnv } from 'shared/types/node-env';

export interface webAppConfigs {
    nodeEnv: NodeEnv;
    sa: {
        username?: string;
        password?: string;
    };
    host: string;
    port: number;
    baseUrl?: string;
    exposedPort: number;
    swaggerPath: string;
    databaseUrl: string;
}
