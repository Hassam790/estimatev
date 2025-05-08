import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}
    create({email, password}: {email: string, password: string}) {
        // Create a new instance of the User entity
        // and set the email and password properties
        // The create method does not save the entity to the database
        // It only creates an instance of the entity
        const userEntityInstance = this.repo.create({email, password});
        // The save method saves the entity to the database
        // and returns the saved entity
        // The save method also returns a promise
        // that resolves to the saved entity
        // The save method also handles the case where the entity already exists
        // in the database and updates it instead of creating a new one
        // The save method also handles the case where the entity is not valid
        // and throws an error if the entity is not valid
        return this.repo.save(userEntityInstance);
    }
}
