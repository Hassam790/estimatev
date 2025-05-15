import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
  // The constructor takes a repository of type User
  // The repository is injected using the @InjectRepository decorator
  // The repository is used to interact with the database
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create({ email, password }: { email: string; password: string }) {
    // Create a new instance of the User entity
    // and set the email and password properties
    // The create method does not save the entity to the database
    // It only creates an instance of the entity
    const userEntityInstance = this.repo.create({ email, password });
    // The save method saves the entity to the database
    // and returns the saved entity

    return this.repo.save(userEntityInstance);
  }
  findOne(id: number) {
    // The findOne method is used to find a single entity by its id
    return this.repo.findOneBy({ id });
  }
  find(email: string) {
    // The find method is used to find entities by their email
    return this.repo.findBy({ email });
  }
  async update(id: number, attrs: Partial<User>) {
    // The update method is used to update an entity by its id
    // The update method does not return the updated entity
    // It only returns the number of affected rows
    // return this.repo.update(id, attrs);
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // The assign method is used to update the entity with the new attributes
    // The assign method does not save the entity to the database
    // It only updates the entity in memory
    Object.assign(user, attrs);
    // The save method saves the entity to the database
    // and returns the saved entity
    return this.repo.save(user);
  }
  async remove(id: number) {
    // The remove method is used to remove an entity by its id
    // The remove method does not return the removed entity
    // It only returns the number of affected rows
    // return this.repo.delete(id);
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
    // The remove method removes the entity from the database
    // and returns the removed entity
  }
}
