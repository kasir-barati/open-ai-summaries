import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Summary } from 'shared/types/summary';

export class CreateSummaryDto
    implements Omit<Summary, 'id' | 'summary'>
{
    @ApiProperty({
        example: 'Use monorepo to solidify maintenance.',
        minLength: 2,
        maxLength: 200,
    })
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    highlight: string;
}
