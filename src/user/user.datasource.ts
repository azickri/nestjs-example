import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from 'src/models/user.model';
import { UserRepository } from './user.repository';
import { Model } from 'mongoose';
import { UserType } from 'src/types/user.type';

@Injectable()
export class UserDatasource implements UserRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ) {}

  async getUser(email: string): Promise<UserType> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      user.password = undefined;
    }

    return user;
  }
}
