import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class CartDto {
    @IsNotEmpty()
    @IsString()
    @Length(42)
    shopper: string;

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Length(42)
    NFTaddress: string;

    @IsNotEmpty()
    @IsNumber()
    tokenId: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    metadata: string;
}