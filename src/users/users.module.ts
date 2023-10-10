import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/repository/database.module';
import { AuthService } from 'src/auth/auth.service';
import { usersProviders } from './repository/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [AuthService, UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
