import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Category } from "../schemas/book.schema"

export class CreateBookDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly author: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    @IsNumber()
    readonly price: number

    @IsOptional()
    @IsEnum(Category, { message: '카테고리를 확인해주세요'})
    readonly category: Category
}