import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/models/user.model';
import { UserController } from './user.controller';
import { UserDatasource } from './user.datasource';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { JwtStrategy } from '../strategies/jwt.strategies';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_ACCESS_TOKEN_SECRET }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    {
      provide: 'UserRepository',
      useClass: UserDatasource,
    },
  ],
  exports: [UserService, JwtStrategy, 'UserRepository'],
})
export class UserModule {}
