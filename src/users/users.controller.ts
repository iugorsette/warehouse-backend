import {
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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Post()
  makeRegister(@Body() user: CreateUserDto): Promise<IUser> {
    return this.usersService.makeRegister(user);
  }
}
