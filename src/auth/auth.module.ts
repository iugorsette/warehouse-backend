import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'SECRET_KEY',
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthGuard, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
