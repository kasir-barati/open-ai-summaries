import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    resolver: 'jest-resolver-tsconfig-paths',
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
};

export default config;
