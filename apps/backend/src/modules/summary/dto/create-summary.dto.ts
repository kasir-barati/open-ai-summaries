import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Summary } from 'shared/types/summary';

export class CreateSummaryDto
    implements Omit<Summary, 'id' | 'summary'>
{
    @ApiProperty({
        example: 'Use monorepo to solidify maintenance.',
        minLength: 2,
    })
    @IsString()
    @MinLength(2)
    highlight: string;
}
