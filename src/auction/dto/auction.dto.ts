import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class AuctionDto {
    @ApiProperty({ example: 1, description: 'Auction ID' })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ example: '2023-07-31T12:00:00Z', description: 'Auction end time' })
    @IsNotEmpty()
    @IsString()
    endTime: string;
}