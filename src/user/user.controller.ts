import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserType } from 'src/types/user.type';
import { UserService } from './user.service';

@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUser(@Req() { user }: { user: UserType }) {
    return this.userService.getUser(user.email);
  }
}
