import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Module({
  providers: [UsersService, UsersResolver],
  imports: [SequelizeModule.forFeature([User])]
})
export class UsersModule { }
