import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import openaiWrapperConfig from './configs/openai-wrapper.config';

@Injectable()
export class OpenaiWrapperService implements OnModuleInit {
    private configuration: Configuration;
    private openai: OpenAIApi;

    constructor(
        @Inject(openaiWrapperConfig.KEY)
        private readonly openaiWrapperConfigs: ConfigType<
            typeof openaiWrapperConfig
        >,
    ) {}

    onModuleInit() {
        this.configuration = new Configuration({
            apiKey: this.openaiWrapperConfigs.openaiApiKey,
        });
        this.openai = new OpenAIApi(this.configuration);
    }

    async generateSummaryForHighlight(highlight: string) {
        const { data } = await this.openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${highlight}\n\rTl;dr:`,
            temperature: 0.7,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 1,
        });

        return data.choices[0].text.replace(/\s+/g, ' ').trim();
    }
}
