import { Length, IsNotEmpty, IsNumber, IsArray, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AirdropDto {
    @ApiProperty({ example: '0x1234567890abcdef1234567890abcdef12345678', description: 'NFT address', minLength: 42, maxLength: 42 })
    @IsNotEmpty()
    @IsString()
    @Length(42)
    NFTaddress: string;

    @ApiProperty({ example: ['0xabcdef...', '0x123456...'], description: 'Array of target addresses' })
    @IsString({ each: true })
    targets: string[];

    @ApiProperty({ example: [1, 2, 3], description: 'Array of market IDs' })
    @IsArray()
    @IsNumber({}, { each: true })
    marketIds: number[];

    @ApiProperty({ example: [10, 20, 30], description: 'Array of token IDs' })
    @IsArray()
    @IsNumber({}, { each: true })
    tokenIds: number[];

    @ApiProperty({ example: '2023-07-31T12:00:00Z', description: 'Airdrop mint date' })
    @IsNotEmpty()
    @IsString()
    mintDate: string;

    @ApiProperty({ example: 100, description: 'price of Airdrop items' })
    @IsNotEmpty()
    @IsNumber()
    price: number;
}