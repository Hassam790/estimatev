import { IsEmail, IsOptional, IsString } from 'class-validator';

class updateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
}
export { updateUserDto };