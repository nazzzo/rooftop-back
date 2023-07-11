import { Length, IsNotEmpty, IsNumber, IsArray, IsString } from "class-validator";

export class AirdropDto {
    @IsNotEmpty()
    @IsString()
    @Length(42)
    NFTaddress: string;

    @IsString({each:true})
    targets : string[];

    @IsArray()
    @IsNumber({}, { each: true })
    marketIds: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    tokenIds: number[];

    @IsNotEmpty()
    @IsString()
    mintDate: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}