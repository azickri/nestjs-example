import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from 'src/models/user.model';
import { AuthRepository } from './auth.repository';
import { Model } from 'mongoose';

@Injectable()
export class AuthDatasource implements AuthRepository {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
  ) {}

  async getUser(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  async createUser({ name, email, password }): Promise<void> {
    const newUser = {
      name,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.userModel.create(newUser);
  }
}
