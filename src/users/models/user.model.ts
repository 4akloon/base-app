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
  @Column({ type: DataType.INTEGER, unique: true, })
  phone: number;

  @Field()
  @Column({ type: DataType.STRING, })
  firstName: string;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING, allowNull: true })
  lastName?: string;

  @Field()
  @Column({ type: DataType.STRING, })
  password: string;
}