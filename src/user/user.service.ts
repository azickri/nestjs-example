import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  async getUser(email: string) {
    return await this.userRepository.getUser(email);
  }
}
