import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenaiWrapperModule } from '../openai-wrapper/openai-wrapper.module';
import { Summary, SummarySchema } from './entities/summary.entity';
import { SummaryController } from './summary.controller';
import { SummaryRepository } from './summary.repository';
import { SummaryService } from './summary.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Summary.name,
                schema: SummarySchema,
            },
        ]),
        OpenaiWrapperModule,
    ],
    controllers: [SummaryController],
    providers: [SummaryService, SummaryRepository],
    exports: [SummaryService],
})
export class SummaryModule {}
