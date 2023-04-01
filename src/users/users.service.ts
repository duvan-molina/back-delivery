import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { decodePassword, encryptPassword } from 'src/helpers/encrypt';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import UserResponse from './user.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<UserResponse> {
    try {
      const userFound = await this.userRepository.findOne({
        where: {
          email: createUserInput.email,
        },
      });

      if (userFound) {
        return {
          errors: [
            {
              path: 'Mutation create user',
              messages: 'The email already exists',
            },
          ],
        };
      }

      const user = this.userRepository.create({
        ...createUserInput,
        password: await encryptPassword(createUserInput.password),
      });
      const result = await this.userRepository.save(user);

      return {
        user: result,
      };
    } catch (error) {
      return {
        errors: [{ path: '', messages: 'Something went wrong' }],
      };
    }
  }

  async loginUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    const passwordValid = await decodePassword(password, user.password);

    if (!user) {
      return {
        errors: [
          {
            path: '',
            messages: 'User not found',
          },
        ],
      };
    }

    if (user && passwordValid) {
      return {
        user,
      };
    }

    return {
      errors: [
        {
          path: '',
          messages: 'Something went wrong',
        },
      ],
    };
  }

  getUser(userId: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: email,
      },
    });
  }

  find(): Promise<User[]> {
    return this.userRepository.find();
  }
}
