import { Inject, Injectable } from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<IUser>,
  ) {}

  async findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<IUser | undefined> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async makeRegister(user: CreateUserDto): Promise<IUser> {
    const created = this.userRepository.create(user);
    return this.userRepository.save(created);
  }
}
