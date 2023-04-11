import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Summary as SharedSummaryType } from 'shared/types/summary';
import { Summary, SummaryDocument } from './entities/summary.entity';

@Injectable()
export class SummaryRepository {
    constructor(
        @InjectModel(Summary.name)
        private summaryModel: Model<SummaryDocument>,
    ) {}

    create(summary: Omit<SharedSummaryType, 'id'>) {
        return this.summaryModel.create({
            ...summary,
        });
    }

    findAll() {
        return this.summaryModel.find();
    }
}
