import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { EncryptService } from '../shared/providers/encrypt.service';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly encryptService: EncryptService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Post()
  async makeRegister(@Body() user: CreateUserDto): Promise<IUser> {
    const found = await this.usersService.findOne(user.username);
    if (found) {
      throw new BadRequestException('User already exists');
    }
    user.password = await this.encryptService.encrypt(user.password);
    return this.usersService.makeRegister(user);
  }
}
