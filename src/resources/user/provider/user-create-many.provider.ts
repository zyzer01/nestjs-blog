import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dto/create-many-users.dto';

@Injectable()
export class UserCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];
    //connect query runner instance to the datasource
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      //create query runner instance
      await queryRunner.connect();
      //start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to the database', {
        description: String(error),
      });
    }
    //commit if successful
    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      //rollback if unsuccessful
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete transaction', {
        description: String(error),
      });
    } finally {
      //release connection
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection', {
          description: String(error),
        });
      }
    }

    return { users: newUsers };
  }
}
