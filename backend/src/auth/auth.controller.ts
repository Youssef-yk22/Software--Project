import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { createUserDto } from 'src/users/dto/createuser.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    console.log('Login attempt with:', loginDto);
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: createUserDto) {
    console.log('Registration attempt with:', createUserDto);
    return this.usersService.create(createUserDto);
  }
}
