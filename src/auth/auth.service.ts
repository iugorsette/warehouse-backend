import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/interfaces/users.interface';
import { EncryptService } from 'src/shared/providers/encrypt.service';
import { SignInDto } from './dto/sing-in-dto';

@Injectable()
export class AuthService {
  private user: IUser;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
  ) {}

  async signIn({ username, password }: SignInDto) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const match = await this.encryptService.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validate(token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      if (payload) {
        this.user = await this.usersService.findOne(payload.username);
      }
      return !!payload;
    } catch {
      return false;
    }
  }

  getUser(): IUser {
    return this.user;
  }
}
