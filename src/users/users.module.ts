import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import the User entity
  ],
  providers: [UsersService, AuthService, CurrentUserInterceptor],
  controllers: [UsersController],
})
export class UsersModule {}
