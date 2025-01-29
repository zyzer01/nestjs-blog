import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserCreateManyProvider } from './providers/user-create-many.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id-provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;
  beforeEach(async () => {
    const mockCreateUserProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 12,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CreateUserProvider,
          useValue: mockCreateUserProvider,
        },
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: UserCreateManyProvider,
          useValue: {},
        },
        {
          provide: CreateGoogleUserProvider,
          useValue: {},
        },
        {
          provide: FindOneUserByEmailProvider,
          useValue: {},
        },
        {
          provide: FindOneByGoogleIdProvider,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('root', () => {
    it('User service must be defined!"', () => {
      expect(service).toBeDefined();
    });

    describe('createUser', () => {
      it('It should be defined', () => {
        expect(service.createUser).toBeDefined();
      });
      it('should call createUser on createUserProvider', async () => {
        let user = await service.createUser({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doesNotMatch.com',
          password: 'password',
        });
        expect(user.firstName).toEqual('John');
      });
    });
  });
});
