import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { Category } from "../schemas/book.schema"

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    readonly title: string

    @IsOptional()
    @IsString()
    readonly author: string

    @IsOptional()
    @IsString()
    readonly description: string

    @IsOptional()
    @IsNumber()
    readonly price: number

    @IsOptional()
    @IsEnum(Category, { message: '카테고리를 확인해주세요'})
    readonly category: Category
}