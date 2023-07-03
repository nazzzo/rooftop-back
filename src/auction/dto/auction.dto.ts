import { IsNotEmpty, IsNumber } from "class-validator";

export class AuctionDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    endTime: number;
}