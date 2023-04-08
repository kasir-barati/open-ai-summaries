import { Inject, Injectable } from '@nestjs/common';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { RepositoryService } from './repository.service';

@Injectable()
export class SummaryService {
    constructor(
        @Inject() private repositoryService: RepositoryService,
    ) {}

    async create(createSummaryDto: CreateSummaryDto) {
        const { highlight } = createSummaryDto;
        const summary = `Do ajax call to open ai with ${highlight}`;
        const summaryDocument = await this.repositoryService.create({
            highlight,
            summary,
        });

        return summaryDocument;
    }

    findAll() {
        return `This action returns all summary`;
    }

    findOne(id: number) {
        return `This action returns a #${id} summary`;
    }

    update(id: number, updateSummaryDto: UpdateSummaryDto) {
        return `This action updates a #${id} summary`;
    }

    remove(id: number) {
        return `This action removes a #${id} summary`;
    }
}
