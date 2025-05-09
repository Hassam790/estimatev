import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post("signup")
    createUser(@Body() body: CreateUserDto) {
        const { email, password } = body;
        return this.usersService.create({ email, password });
    }
    @Get("/:id")
    findUser(@Param("id") id: string) {
        return this.usersService.findOne(parseInt(id));
    }
    @Get("/users")
    findUsers(@Query("email") email: string) {
        console.log(email);
        return this.usersService.find(email);
    }
    @Patch("/:id")
    updateUser(@Param("id") id: string, @Body() body: Partial<CreateUserDto>) {
        return this.usersService.update(parseInt(id), body);
    }
    @Delete("/:id")
    removeUser(@Param("id") id: string) {
        return this.usersService.remove(parseInt(id));
    }
}
