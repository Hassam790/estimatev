import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from 'src/middlewares/current-user.middleware';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import the User entity
  ],
  providers: [UsersService, AuthService, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor, // Register the CurrentUserInterceptor globally
  }],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer : MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes("*")
  }
}
