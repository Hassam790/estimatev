import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';
describe('Auth Service', () => {
  let service: AuthService;
  let FakeUsersService: Partial<UsersService>;
  let users: User[] = [];
  beforeEach(async () => {
    FakeUsersService = {
      create: ({ email, password }: { email: string; password: string }) => {
        const user = { id: 1, email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      },
      find: (email: string) =>
        Promise.resolve(users.filter((user) => user.email === email)),
    };
    // Create DI container
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: FakeUsersService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('should create instance of auth service', async () => {
    expect(service).toBeDefined();
  });
  it('should salt and hash password', async () => {
    const user = await service.signup('abc@example.com', '123');
    const [salt, hash] = user.password.split('.');
    expect(hash).toBeDefined();
  });
  it('should throw error email already in use', async () => {
    FakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'abc@example.com', password: '123' } as User,
      ]);
   await expect(service.signup('abc@example.com', '123')).rejects.toThrow(
      BadRequestException,
    );
  });
  
  it('should be able to sign in with correct credentials', async () => {
    
    const user = await service.signin('abc@example.com', '123');
    expect(user).toBeDefined();
  });
  it("should throw an error if signin is called with an unused email", async () => {
   
   await  expect(service.signin('abac@ab.com',"123")).rejects.toThrow(
      BadRequestException,
    );
  });
  it("should throw an error if an invalid password is provided", async () => {
   await expect( service.signin("abc@example.com","1234")).rejects.toThrow(BadRequestException)
  })
});
