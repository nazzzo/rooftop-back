import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AuctionDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    endTime: string;
}