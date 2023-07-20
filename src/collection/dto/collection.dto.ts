import { IsBoolean, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CollectionDto {
    @ApiProperty({ example: '0x1234567890abcdef1234567890abcdef12345678', description: 'Collection address', minLength: 42, maxLength: 42 })
    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly address: string;

    @ApiProperty({ example: '0x1234567890abcdef1234567890abcdef12345678', description: 'Creator address', minLength: 42, maxLength: 42 })
    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly creator: string;

    @ApiProperty({ example: 'My Collection', description: 'Collection name' })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ example: 'MATIC', description: 'Collection symbol' })
    @IsNotEmpty()
    @IsString()
    readonly symbol: string;

    @ApiProperty({ example: 'This is a collection', description: 'Collection description' })
    @IsString()
    readonly description: string;

    @ApiProperty({ example: '2.5%', description: 'Creator fee' })
    @IsNotEmpty()
    @IsString()
    readonly creatorFee: string;

    @ApiProperty({ example: 0.07, description: 'Floor price (MATIC)' })
    @IsNotEmpty()
    @IsNumber()
    floorPrice: number;

    @ApiProperty({ example: 100, description: 'Total volume (MATIC)' })
    @IsNotEmpty()
    @IsNumber()
    totalVolume: number;

    @ApiProperty({ example: 100, description: 'Total sales count' })
    @IsNotEmpty()
    @IsNumber()
    totalSales: number;

    @ApiProperty({ example: true, description: 'For recommended collection' })
    @IsNotEmpty()
    @IsBoolean()
    verified: boolean;

    @ApiProperty({ example: 'https://example.com/logo.png', description: 'Collection logo image URL' })
    // @IsNotEmpty()
    @IsString()
    readonly logo: string;

    @ApiProperty({ example: ['0xabcdef', '0x123456'], description: 'Array of user addresses who favorited the collection' })
    @IsString({ each: true })
    favorite: string[];

    @ApiProperty({ example: 'my-collection', description: 'Collection URL' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-z0-9-]+$/)
    readonly url: string;
}
