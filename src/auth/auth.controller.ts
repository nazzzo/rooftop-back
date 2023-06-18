import { Get, Post, Delete, Body, Controller, Req, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/sign')
    async login(@Body() userDto: UserDto) {
        // console.log(userDto)
        return this.authService.login(userDto)
    }

    @Put('/update')
    async updateUser(@Body() updateProps: UserDto ): Promise<User> {
        return this.authService.update(updateProps)
    }

    // @Get('/login')
    // login(@Body() loginDto: UserDto): Promise<{ token: string }> {
    //     return this.authService.login(loginDto)
    // }

    @Delete('/delete')
    async deleteUser(@Body() userProps: UserDto ) {
        return this.authService.deleteById(userProps)
    }
}
