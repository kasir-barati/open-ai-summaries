import { ConfigType } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCompletionResponse, OpenAIApi } from 'openai';
import openaiWrapperConfig from './configs/openai-wrapper.config';
import { OpenaiWrapperService } from './openai-wrapper.service';
import { OpenaiWrapperConfig } from './openai-wrapper.type';

const mockedSummary =
    'A monorepo is a large version-controlled repository that holds many related projects, and is used by companies like Google, Microsoft, Facebook, and Twitter.';
const highlight =
    'A monorepo is a version-controlled code repository that holds many projects. While these projects may be related, they are often logically independent and run by different teams. Some companies host all their code in a single repository, shared among everyone. Monorepos can reach colossal sizes. Google, for example, is theorized to have the largest code repository ever, which has tens of hundreds of commits per day and is over 80 TBs large. Other companies known to run large monorepos are Microsoft, Facebook, and Twitter.\n\rTl;dr:';

jest.mock('openai', () => {
    return {
        Configuration: jest.fn(),
        OpenAIApi: jest.fn().mockImplementation(() => {
            return {
                createCompletion: jest.fn().mockResolvedValue({
                    data: {
                        choices: [
                            {
                                text: mockedSummary,
                            },
                        ],
                    } as Partial<CreateCompletionResponse>,
                }),
            } as Partial<OpenAIApi>;
        }),
    };
});

describe('OpenaiWrapperService', () => {
    let service: OpenaiWrapperService;
    let mockedOpenaiWrapperConfig: ConfigType<
        typeof openaiWrapperConfig
    >;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OpenaiWrapperService,
                {
                    provide: openaiWrapperConfig.KEY,
                    useValue: {
                        openaiApiKey: 'Dummy openai api key',
                    } as OpenaiWrapperConfig,
                },
            ],
        }).compile();

        service = module.get(OpenaiWrapperService);
        service.onModuleInit();
        mockedOpenaiWrapperConfig = module.get(
            openaiWrapperConfig.KEY,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should generate summary for highlight', async () => {
        const summary = await service.generateSummaryForHighlight(
            highlight,
        );

        expect(summary).toBe(mockedSummary);
    });
});
