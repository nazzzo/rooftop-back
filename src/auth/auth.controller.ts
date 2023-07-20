import { Get, Post, Delete, Body, Controller,HttpException, HttpStatus, Req, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth') // 태그 추가
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/sign')
    @ApiOperation({ summary: 'User sign up or sign in' })
    @ApiBody({ type: UserDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the user token' })
    async login(@Body() userDto: UserDto) {
        return this.authService.login(userDto)
    }

    @Put('/update')
    @ApiOperation({ summary: 'Update user information' })
    @ApiBody({ type: UserDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns the updated user' })
    async updateUser(@Body() updateProps: UserDto ): Promise<User> {
        return this.authService.update(updateProps)
    }

    @Delete('/delete')
    @ApiOperation({ summary: 'Delete user' })
    @ApiBody({ type: UserDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'Returns a success message' })
    async deleteUser(@Body() userProps: UserDto ) {
        return this.authService.deleteById(userProps)
    }
}
