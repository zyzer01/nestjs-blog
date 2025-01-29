import { Injectable } from '@nestjs/common';
import { GetUserParamsDto } from './dto/get-user-params.dto';
/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UserService {
  /**
   * The method to get all the users from the database
   */
  public findAll(
    getUserParamDto: GetUserParamsDto,
    limt: number,
    page: number,
  ) {
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }
  /**
   * Find a single user using the ID of the user
   */
  public findOneById(id: string) {
    return {
      id: 1234,
      firstName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}
