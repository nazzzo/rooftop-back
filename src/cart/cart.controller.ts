import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './schemas/cart.schema';
import { CartDto } from './dto/cart.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('cart')
@ApiTags('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @Get(':address')
    @ApiOperation({ summary: 'Get user cart' })
    @ApiParam({ name: 'address', type: String, description: 'User address' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the user cart' })
    async getCart(@Param('address') address: string): Promise<Cart[]> {
        try {
            return await this.cartService.find(address);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/add')
    @ApiOperation({ summary: 'Add item to cart' })
    @ApiBody({ type: CartDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Returns the added cart item' })
    async postCart(@Body() cartDto: CartDto): Promise<Cart> {
        try {
            return await this.cartService.create(cartDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }

    @Post('/checkDuplicate')
    @ApiOperation({ summary: 'Check if item already exists in cart' })
    @ApiBody({ type: CartDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the found cart item if it exists' })
    async postCheckDuplicate(@Body() body) {
        try {
            return await this.cartService.findOne(body);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':address/:id')
    @ApiOperation({ summary: 'Delete cart item' })
    @ApiParam({ name: 'address', type: String, description: 'User address' })
    @ApiParam({ name: 'id', type: String, description: 'Cart item ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns a success message' })
    async deleteCartItem(@Param('address') address: string, @Param('id') id: string): Promise<string> {
        try {
            await this.cartService.deleteOne(address, id);
            return 'The cart item has been deleted';
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':address')
    @ApiOperation({ summary: 'Delete all cart items' })
    @ApiParam({ name: 'address', type: String, description: 'User address' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns a success message' })
    async deleteAllCartItem(@Param('address') address: string): Promise<string> {
        try {
            await this.cartService.deleteAll(address);
            return 'All cart items have been deleted';
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
