import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './schemas/cart.schema';
import { CartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @Get(':address')
    async getCart(@Param('address') address: string): Promise<Cart[]>  {
        try {
            return await this.cartService.find(address);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/add')
    async postCart(@Body() cartDto: CartDto): Promise<Cart> {
        try {
            return await this.cartService.create(cartDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }

    @Post('/checkDuplicate')
    async postCheckDuplicate(@Body() body) {
        try {
            return await this.cartService.findOne(body);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':address/:id')
    async deleteCartItem(@Param('address') address: string, @Param('id') id: string): Promise<string> {
      try {
        await this.cartService.deleteOne(address, id);
        return '장바구니 아이템이 삭제되었습니다';
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Delete(':address')
    async deleteAllCartItem(@Param('address') address: string): Promise<string> {
      try {
        await this.cartService.deleteAll(address);
        return '모든 장바구니 아이템이 삭제되었습니다';
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
