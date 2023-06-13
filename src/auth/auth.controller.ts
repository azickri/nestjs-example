import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  register(@Body() { name, email, password }: RegisterDto) {
    return this.authService.register({ name, email, password });
  }
}
