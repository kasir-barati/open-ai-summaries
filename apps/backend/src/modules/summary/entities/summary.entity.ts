import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Summary as SharedSummaryType } from 'shared/types/summary';

export type SummaryDocument = HydratedDocument<Summary>;

@Schema({
    timestamps: {
        createdAt: true,
        updatedAt: true,
    },
    autoIndex: true,
    validateBeforeSave: true,
    strict: true,
    selectPopulatedPaths: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})
export class Summary implements SharedSummaryType {
    id: string;
    // @Prop({
    //     type: Types.ObjectId,
    //     required: true,
    // })
    // userId: Types.ObjectId;

    // What should I put here, Should I even put it here, I am talking about the logic of fetching user data from keycloak and adding it to the Summary data
    // User?: any;

    @Prop({ minlength: 2 })
    highlight: string;

    @Prop({ required: false })
    summary: string;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
