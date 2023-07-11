import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
    timestamps: true
})
export class Airdrop {
    @Prop()
    NFTaddress: string;

    @Prop()
    targets: string[];

    @Prop()
    marketIds: number[];

    @Prop()
    tokenIds: number[];
    
    @Prop()
    mintDate: string;

    @Prop()
    price: number;
}

export const AirdropSchema = SchemaFactory.createForClass(Airdrop)