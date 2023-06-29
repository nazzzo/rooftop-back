import { IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator"

export class EventDto {
    @IsNotEmpty()
    @IsNumber()
    readonly id: number

    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly from: string;

    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly to: string;

    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly NFTaddress: string;

    @IsNotEmpty()
    @IsNumber()
    readonly tokenId: number;

    @IsNumber()
    readonly price: number;

    @IsString()
    readonly krwPrice: string;

    @IsNotEmpty()
    @IsString()
    readonly event: string;
}