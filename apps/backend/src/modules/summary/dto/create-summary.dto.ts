import { IsString, MaxLength, MinLength } from 'class-validator';
import { Summary } from 'shared/types/summary';

export class CreateSummaryDto
    implements Omit<Summary, 'id' | 'summary'>
{
    @IsString()
    @MinLength(2)
    @MaxLength(200)
    highlight: string;
}
