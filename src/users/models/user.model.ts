import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateUserInput } from '../dto/inputs/create-user.input';

@ObjectType()
@Table({ tableName: 'users' })
export class User extends Model<User, CreateUserInput> {
  @Field()
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Field()
  @Column({ type: DataType.STRING, unique: true, })
  email: string;

  @Field(() => Int)
  @Column({ type: DataType.INTEGER, defaultValue: 10 })
  age: number;

  @Field({ nullable: true })
  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: true })
  isSubscribed?: boolean;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING, })
  password: string;
}