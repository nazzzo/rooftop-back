import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Category {
    A = 'A',
    B = 'B',
    C = 'C'
}

@Schema({
    timestamps: true,
})
export class Book {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    author: string;

    @Prop()
    price: number;

    @Prop()
    category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book)