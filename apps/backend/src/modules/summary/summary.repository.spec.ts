import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Summary } from './entities/summary.entity';
import { SummaryRepository } from './summary.repository';

describe('SummaryRepository', () => {
    let mockedModel = {
        create: jest.fn(),
        find: jest.fn(),
    };
    let repository: SummaryRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken(Summary.name),
                    useValue: mockedModel,
                },
                SummaryRepository,
            ],
        }).compile();

        mockedModel = module.get(getModelToken(Summary.name));
        repository = module.get(SummaryRepository);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    it('should create a new summary', async () => {
        const summary = {
            highlight: 'Highligh',
            summary: 'summary',
        };
        const mockedSummaryDocument = {
            _id: '6434fab0f8f2c2050d86a563',
            id: '6434fab0f8f2c2050d86a563',
            ...summary,
            createdAt: '2023-04-11T06:14:08.903Z',
            updatedAt: '2023-04-11T06:14:08.903Z',
            __v: 0,
        };

        mockedModel.create.mockImplementationOnce(() => {
            return mockedSummaryDocument;
        });

        const summaryDocument = await repository.create(summary);

        expect(summaryDocument).toEqual(mockedSummaryDocument);
    });

    it('should find all summaries', async () => {
        const mockedSummariesDocuments = [
            {
                _id: '6434fab0f8f2c2050d86a563',
                id: '6434fab0f8f2c2050d86a563',
                highlight: 'Highligh',
                summary: 'summary',
                createdAt: '2023-04-11T06:14:08.903Z',
                updatedAt: '2023-04-11T06:14:08.903Z',
                __v: 0,
            },
        ];

        mockedModel.find.mockImplementationOnce(() => {
            return mockedSummariesDocuments;
        });

        const summariesDocuments = await repository.findAll();

        expect(summariesDocuments).toEqual(mockedSummariesDocuments);
    });
});
