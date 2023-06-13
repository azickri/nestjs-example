import { Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UserType } from 'src/types/user.type';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository') private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.authRepository.getUser(email);
    if (!user) {
      return Promise.reject({
        statusCode: 401,
        message: 'user has not been registered',
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return Promise.reject({
        statusCode: 401,
        message: 'wrong password',
      });
    }

    return await this.generateToken(user);
  }

  async register({ name, email, password }) {
    const user = await this.authRepository.getUser(email);
    if (user) {
      return Promise.reject({
        statusCode: 403,
        message: 'user has registered',
      });
    }

    await this.authRepository.createUser({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
  }

  // Private User

  private async generateToken(user: UserType) {
    const payload = JSON.parse(JSON.stringify(user));

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    payload.password = undefined;

    return {
      user: payload,
      accessToken,
      refreshToken,
    };
  }
}
