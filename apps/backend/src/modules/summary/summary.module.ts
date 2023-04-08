import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Summary, SummarySchema } from './entities/summary.entity';
import { RepositoryService } from './repository.service';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Summary.name,
                schema: SummarySchema,
            },
        ]),
    ],
    controllers: [SummaryController],
    providers: [SummaryService, RepositoryService],
})
export class SummaryModule {}
