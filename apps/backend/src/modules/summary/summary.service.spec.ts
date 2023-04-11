import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiWrapperService } from '../openai-wrapper/openai-wrapper.service';
import { SummaryRepository } from './summary.repository';
import { SummaryService } from './summary.service';

describe('SummaryService', () => {
    let mockedRepository = {
        create: jest.fn(),
        findAll: jest.fn(),
    };
    let mockedOpenaiWrapperService = {
        generateSummaryForHighlight: jest.fn(),
    };
    let service: SummaryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SummaryService,
                {
                    provide: SummaryRepository,
                    useValue: mockedRepository,
                },
                {
                    provide: OpenaiWrapperService,
                    useValue: mockedOpenaiWrapperService,
                },
            ],
        }).compile();

        mockedRepository = module.get(SummaryRepository);
        mockedOpenaiWrapperService = module.get(OpenaiWrapperService);
        service = module.get(SummaryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create summary', async () => {
        const summary = 'summary';
        const highlight = 'Highligh';
        const mockedSummaryDocument = {
            _id: '6434fab0f8f2c2050d86a563',
            id: '6434fab0f8f2c2050d86a563',
            highlight,
            summary,
            createdAt: '2023-04-11T06:14:08.903Z',
            updatedAt: '2023-04-11T06:14:08.903Z',
            __v: 0,
        };

        mockedOpenaiWrapperService.generateSummaryForHighlight.mockImplementationOnce(
            () => {
                return summary;
            },
        );
        mockedRepository.create.mockImplementationOnce(() => {
            return mockedSummaryDocument;
        });

        const summaryDocument = await service.create({ highlight });

        expect(summaryDocument).toEqual(mockedSummaryDocument);
    });

    it('should return all summaries', async () => {
        const mockedSummariesDocuments = [
            {
                _id: '6434fab0f8f2c2050d86a563',
                id: '6434fab0f8f2c2050d86a563',
                highlight: 'highlight',
                summary: 'summary',
                createdAt: '2023-04-11T06:14:08.903Z',
                updatedAt: '2023-04-11T06:14:08.903Z',
                __v: 0,
            },
        ];

        mockedRepository.findAll.mockImplementationOnce(() => {
            return mockedSummariesDocuments;
        });

        const summaries = await service.findAll();

        expect(summaries).toEqual(mockedSummariesDocuments);
    });
});
