import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public createUser(createUserData: CreateUserInput): User {
    const user: User = {
      id: uuidv4(),
      ...createUserData,
    }

    this.users.push(user);

    return user;
  }

  public updateUser(updateUserData: UpdateUserInput): User {
    const user = this.users.find(user => user.id === updateUserData.id);

    Object.assign(user, updateUserData);

    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find(user => user.id === getUserArgs.id);
  }

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.ids.map(userId => this.getUser({ id: userId }))
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(user => user.id == deleteUserData.id);

    const user = this.users[userIndex];

    this.users.splice(userIndex);

    return user;
  }
}
