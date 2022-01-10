import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetUserArgs } from './dto/args/get-user.args';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './models/user.model';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User) { }

  async createUser(createUserData: CreateUserInput): Promise<User> {
    return this.userRepository.create(createUserData);
  }

  async updateUser(updateUserData: UpdateUserInput): Promise<User> {
    const { id, ...data } = updateUserData;
    await this.userRepository.update(data, {
      where: {
        id: id,
      },
    },
    );

    return this.userRepository.findOne({ where: { id: id } });
  }

  async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return this.userRepository.findOne({ where: getUserArgs });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async deleteUser(deleteUserData: DeleteUserInput): Promise<boolean> {
    const count = await this.userRepository.destroy({ where: deleteUserData });
    return count === 1;
  }
}
