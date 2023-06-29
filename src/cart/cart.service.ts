import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import mongoose from 'mongoose';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name)
        private cartModel: mongoose.Model<Cart>,
    ) { }

    async find(shopper: string): Promise<Cart[]> {
        try {
            const cart = await this.cartModel.find({ shopper });
            console.log(`get cart:: ${cart}`);
            if (!cart) {
                throw new NotFoundException('Data not found');
            }
            return cart;
        } catch (e) {
            throw new Error(e);
        }
    }

    async findOne(body): Promise<Cart> {
        try {
            const { shopper, id } = body;
            const cart = await this.cartModel.findOne({ shopper, id });
            return cart;
        } catch (e) {
            throw new Error(e);
        }
    }

    async create(cartDto: CartDto): Promise<Cart> {
        try {
            const newCartItem = await this.cartModel.create({
                ...cartDto,
            })
            console.log(newCartItem)

            return newCartItem
        } catch (e) { throw new Error(e) }
    }

    async deleteOne(address: string, id: string): Promise<void> {
        try {
            await this.cartModel.deleteOne({ shopper: address, id });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAll(address: string): Promise<void> {
        try {
            await this.cartModel.deleteMany({ shopper: address });
        } catch (error) {
            throw new Error(error);
        }
    }
}