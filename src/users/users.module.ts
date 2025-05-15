import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Import the User entity
    ],
  providers: [UsersService, AuthService],
  controllers: [UsersController]
})
export class UsersModule {}
