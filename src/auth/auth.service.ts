import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthService {
  private user: IUser;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
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
