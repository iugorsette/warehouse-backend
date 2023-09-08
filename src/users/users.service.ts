import { Inject, Injectable } from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private users: Model<IUser>) {}

  async findAll(): Promise<IUser[]> {
    return this.users.find().exec();
  }
  async findOne(username: string): Promise<IUser | undefined> {
    return this.users.findOne({ username }).exec();
  }

  async makeRegister(user: IUser): Promise<IUser> {
    const createdUser = new this.users(user);
    return createdUser.save();
  }
}
