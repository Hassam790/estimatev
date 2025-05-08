import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}
    create({email, password}: {email: string, password: string}) {
        const userEntityInstance = this.repo.create({email, password});
        return this.repo.save(userEntityInstance);
    }
}
