import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
    timestamps: true
})
export class Auction {
    @Prop()
    id: number;

    @Prop()
    endTime: string;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction)