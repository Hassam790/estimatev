import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(email: string, password: string) {
    //check email if already exist
    const user = await this.usersService.find(email);
    console.log("user", user)
    if (user.length) {
      throw new BadRequestException("email in use");
    }
    // Encrypt/Hash password
    //generate salt
    const salt = randomBytes(8).toString('hex'); //8 bytes of data and 1byte of data is equal to 2 char, which mean 16char string
    //combine password and salt and hash
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //combine salt and hash division separator(.)
    const result = salt + '.' + hash.toString('hex');
    // Create user and return user
    return this.usersService.create({ email, password: result });
  }

  signin() {}
}
