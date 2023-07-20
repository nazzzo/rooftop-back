import { IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({ example: '0x1234567890abcdef1234567890abcdef12345678', description: 'User address', minLength: 42, maxLength: 42 })
    @IsNotEmpty()
    @IsString()
    @Length(42)
    readonly address: string;
}