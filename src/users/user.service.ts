import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly user: IUser[] = [];

  create(user: IUser) {
    this.user.push(user);
  }

  findAll(): IUser[] {
    return this.user;
  }
}
