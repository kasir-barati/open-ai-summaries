import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import openaiWrapperConfig from './configs/openai-wrapper.config';
import { OpenaiWrapperService } from './openai-wrapper.service';

@Module({
    imports: [ConfigModule.forFeature(openaiWrapperConfig)],
    providers: [OpenaiWrapperService],
    exports: [OpenaiWrapperService],
})
export class OpenaiWrapperModule {}
