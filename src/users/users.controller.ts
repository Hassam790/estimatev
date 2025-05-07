import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
    @Post("signup")
    createUser(@Body() body: CreateUserDto) {
        const { email, password } = body;
        console.log(email, password);
        // Here you would typically save the user to the database
        // and return a response.
        return "User Created";
    }
}
