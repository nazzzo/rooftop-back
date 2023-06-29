import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Cart {
    @Prop()
    shopper: string;

    @Prop()
    id: number;

    @Prop()
    NFTaddress: string;

    @Prop()
    tokenId: number;

    @Prop()
    price: number;

    @Prop()
    metadata: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart)