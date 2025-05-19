import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service"
import { User } from "./user.entity"

it("should create instance of auth service",async  () => {
    const FakeUsersService: Partial<UsersService> = {
        create: ({email, password}:{email:string; password:string}) => {
            return Promise.resolve({id:1, email, password} as User)
        },
        find:() =>  Promise.resolve([])
        
    }
  // Create DI container
  const module =await Test.createTestingModule({
    providers:[AuthService, {
        provide: UsersService,
        useValue: FakeUsersService
    }]
}).compile();
const service = module.get(AuthService);
expect(service).toBeDefined()
})