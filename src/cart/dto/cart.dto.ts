import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
    @ApiProperty({ example: '0x1234567890abcdef1234567890abcdef12345678', description: 'Shopper address', minLength: 42, maxLength: 42 })
    @IsNotEmpty()
    @IsString()
    @Length(42)
    shopper: string;

    @ApiProperty({ example: '0x1234567890abcdef1234567890abcdef12345678', description: 'Seller address', minLength: 42, maxLength: 42 })
    @IsNotEmpty()
    @IsString()
    @Length(42)
    seller: string;

    @ApiProperty({ example: 1, description: 'Market ID' })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ example: '0x1234567890abcdef1234567890abcdef12345678', description: 'CA of this contract', minLength: 42, maxLength: 42 })
    @IsNotEmpty()
    @IsString()
    @Length(42)
    NFTaddress: string;

    @ApiProperty({ example: 1, description: 'Token ID' })
    @IsNotEmpty()
    @IsNumber()
    tokenId: number;

    @ApiProperty({ example: 0.5, description: 'Price (MATIC)' })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ example: '{"name": "NFT"}', description: 'Metadata' })
    @IsNotEmpty()
    @IsString()
    metadata: string;
}