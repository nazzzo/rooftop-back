import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Collection {
    @Prop({ unique: [true, 'Duplicated Address'] })
    address: string;

    @Prop()
    creator: string;

    @Prop({ unique: [true, 'Duplicated Name'] })
    name: string;

    @Prop()
    symbol: string;

    @Prop()
    description: string;

    @Prop({ unique: [true, 'Duplicated URL'] })
    url: string;

    @Prop()
    creatorFee: string;

    @Prop()
    floorPrice: number;

    @Prop()
    totalVolume: number;

    @Prop()
    verified: boolean;

    @Prop()
    logo: string;

}

export const CollectionSchema = SchemaFactory.createForClass(Collection)