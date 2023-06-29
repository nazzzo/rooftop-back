import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Event {
    @Prop()
    id: number;

    @Prop()
    from: string;

    @Prop()
    to: string;

    @Prop()
    NFTaddress: string;

    @Prop()
    tokenId: number;

    @Prop()
    price: number;

    @Prop()
    krwPrice: string;


    @Prop()
    event: string;
}

export const EventSchema = SchemaFactory.createForClass(Event)