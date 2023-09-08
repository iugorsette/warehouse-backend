import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Post()
  makeRegister(@Body() user: IUser): Promise<IUser> {
    return this.usersService.makeRegister(user);
  }
}
