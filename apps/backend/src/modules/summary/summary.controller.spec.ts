import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ENDPOINT } from 'shared/types/summary';
import supertest from 'supertest';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

describe('SummaryController', () => {
    let app: INestApplication;
    let mockedService = {
        create: jest.fn(),
        findAll: jest.fn(),
    };
    let controller: SummaryController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SummaryController],
            providers: [
                {
                    provide: SummaryService,
                    useValue: mockedService,
                },
            ],
        }).compile();

        app = module.createNestApplication();
        mockedService = module.get(SummaryService);
        controller = module.get(SummaryController);

        app.init();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a summary', async () => {
        const highlight = 'Highligh';
        const mockedSummaryDocument = {
            _id: '6434fab0f8f2c2050d86a563',
            id: '6434fab0f8f2c2050d86a563',
            highlight,
            summary: 'summary',
            createdAt: '2023-04-11T06:14:08.903Z',
            updatedAt: '2023-04-11T06:14:08.903Z',
            __v: 0,
        };

        mockedService.create.mockImplementationOnce(() => {
            return mockedSummaryDocument;
        });

        await supertest(app.getHttpServer())
            .post(`/${ENDPOINT}`) // Should I export it from controller? What is a good approach here
            .expect(201)
            .expect(mockedSummaryDocument);
    });

    it('should return summaries', async () => {
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

        mockedService.findAll.mockImplementationOnce(() => {
            return mockedSummariesDocuments;
        });

        await supertest(app.getHttpServer())
            .get(`/${ENDPOINT}`)
            .expect(200)
            .expect(mockedSummariesDocuments);
    });
});
