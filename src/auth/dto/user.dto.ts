import { IsNotEmpty, IsString, Length } from "class-validator"

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly address: string
}