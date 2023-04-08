import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { SummaryService } from './summary.service';

@Controller('summaries')
export class SummaryController {
    constructor(private readonly summaryService: SummaryService) {}

    @Post()
    create(@Body() createSummaryDto: CreateSummaryDto) {
        return this.summaryService.create(createSummaryDto);
    }

    @Get()
    findAll() {
        return this.summaryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.summaryService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateSummaryDto: UpdateSummaryDto,
    ) {
        return this.summaryService.update(+id, updateSummaryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.summaryService.remove(+id);
    }
}
