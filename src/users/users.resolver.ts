import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUserArgs } from './dto/args/get-user.args';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) { }

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.userService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<User> {
    return this.userService.createUser(createUserData);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): Promise<User> {
    return this.userService.updateUser(updateUserData);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): Promise<boolean> {
    return this.userService.deleteUser(deleteUserData);
  }

}
