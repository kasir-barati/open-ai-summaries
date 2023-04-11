import { Injectable } from '@nestjs/common';
import { OpenaiWrapperService } from '../openai-wrapper/openai-wrapper.service';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { SummaryRepository } from './summary.repository';

@Injectable()
export class SummaryService {
    constructor(
        private summaryRepository: SummaryRepository,
        private openaiWrapperService: OpenaiWrapperService,
    ) {}

    async create(createSummaryDto: CreateSummaryDto) {
        const { highlight } = createSummaryDto;
        const summary =
            await this.openaiWrapperService.generateSummaryForHighlight(
                highlight,
            );
        const summaryDocument = await this.summaryRepository.create({
            highlight,
            summary,
        });

        return summaryDocument;
    }

    findAll() {
        return this.summaryRepository.findAll();
    }

    findOne(id: number) {
        return `This action returns a #${id} summary`;
    }

    update(id: number, updateSummaryDto: UpdateSummaryDto) {
        return `This action updates a #${id} summary ${updateSummaryDto}`;
    }

    remove(id: number) {
        return `This action removes a #${id} summary`;
    }
}
