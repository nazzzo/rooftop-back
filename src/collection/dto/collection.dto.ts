import { IsNotEmpty, IsString, Length, Matches } from "class-validator"

export class CollectionDto {
    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly address: string

    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly creator: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly symbol: string;

    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly creatorFee: string;

    // @IsNotEmpty()
    @IsString()
    readonly logo: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-z0-9-]+$/)
    readonly url: string;
}