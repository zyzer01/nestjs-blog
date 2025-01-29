import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from 'src/resources/mail/mail.service';
import { HashingProvider } from 'src/resources/auth/providers/hashing.provider';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserProvider } from './create-user.provider';
import { BadRequestException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('UserService', () => {
  let provider: CreateUserProvider;
  let userRepository: MockRepository;

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doesNotMatch.com',
    password: 'password',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
        {
          provide: MailService,
          useValue: { sendWelcomeEmail: jest.fn(() => Promise.resolve()) },
        },
        {
          provide: HashingProvider,
          useValue: { hashPassword: jest.fn(() => user.password) },
        },
      ],
    }).compile();

    provider = module.get<CreateUserProvider>(CreateUserProvider);
    userRepository = module.get(getRepositoryToken(User));
  });

  describe('root', () => {
    it('Should be defined', () => {
      expect(provider).toBeDefined();
    });

    describe('When the user does not exist in the database', () => {
      it('it should create a new user', async () => {
        userRepository.findOne.mockReturnValue(null);
        userRepository.create.mockReturnValue(user);
        userRepository.save.mockReturnValue(user);

        const newUser = await provider.createUser(user);
        expect(userRepository.findOne).toHaveBeenCalledWith({
          where: { email: user.email },
        });
        expect(userRepository.create).toHaveBeenCalledWith(user);
      });
    });
    describe('When the user exists in the database', () => {
      it('it should throw a bad request exception', async () => {
        userRepository.findOne.mockReturnValue(user.email);
        userRepository.create.mockReturnValue(user);
        userRepository.save.mockReturnValue(user);

        try {
          await provider.createUser(user);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });
});
