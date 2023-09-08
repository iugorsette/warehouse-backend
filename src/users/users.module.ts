import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/repository/database.module';
import { AuthService } from 'src/auth/auth.service';
import { usersProviders } from 'src/repository/providers/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    AuthService,
    UsersService,
    ...usersProviders,
    {
      provide: 'SECRET_KEY',
      useValue: process.env.SECRET_KEY,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
