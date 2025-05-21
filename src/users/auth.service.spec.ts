import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';
describe('Auth Service', () => {
  let service: AuthService;
  let FakeUsersService: Partial<UsersService>
  beforeEach(async () => {
     FakeUsersService = {
      create: ({ email, password }: { email: string; password: string }) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      find: () => Promise.resolve([]),
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
      const user = await service.signup("abc@example.com","123");
      const [salt,hash] = user.password.split(".")
      expect(hash).toBeDefined();
  });
  it("should throw error email already in use", () => {
    FakeUsersService.find = () => Promise.resolve([{id:1, email:"abc@example.com", password:"123"} as User])
    expect(service.signup("abc@example.com","123")).rejects.toThrow(BadRequestException)
  })
});
