import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user login and issues a JWT token.
   * @param req - The user login request.
   * @returns A JWT token if credentials are valid.
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
