import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/models/user.model';
import { AuthController } from './auth.controller';
import { AuthDatasource } from './auth.datasource';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

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
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AuthRepository',
      useClass: AuthDatasource,
    },
  ],
  exports: [AuthService, 'AuthRepository'],
})
export class AuthModule {}
