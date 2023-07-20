import { IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
    @ApiProperty({ example: 1, description: 'Event ID' })
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty({ example: '0x1234567890abcdef1234567890abcdef12345678', description: 'Message Sender address', minLength: 42, maxLength: 42 })
    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly from: string;

    @ApiProperty({ example: '0x1234567890abcdef1234567890abcdef12345678', description: 'Recipient address', minLength: 42, maxLength: 42 })
    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly to: string;

    @ApiProperty({ example: '0x1234567890abcdef1234567890abcdef12345678', description: 'NFT address / CA', minLength: 42, maxLength: 42 })
    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly NFTaddress: string;

    @ApiProperty({ example: 123, description: 'Token ID' })
    @IsNotEmpty()
    @IsNumber()
    readonly tokenId: number;

    @ApiProperty({ example: 0.07, description: 'Price (MATIC)' })
    @IsNumber()
    readonly price: number;

    @ApiProperty({ example: '100000', description: 'Price in KRW' })
    @IsString()
    readonly krwPrice: string;

    @ApiProperty({ example: 'transfer', description: 'type of Event ~ minted or transfer' })
    @IsNotEmpty()
    @IsString()
    readonly event: string;
}
