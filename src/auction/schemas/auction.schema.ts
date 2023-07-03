import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
    timestamps: true
})
export class Auction {
    @Prop()
    id: number;

    @Prop()
    endTime: number;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction)