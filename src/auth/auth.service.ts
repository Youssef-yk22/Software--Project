import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuditService } from 'src/audit/audit.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Validates a user by their email and password.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns The validated user or null if invalid.
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Logs in a user and returns a JWT token.
   * @param user - The validated user.
   * @returns An object containing the JWT token.
   */
  async login(loginDto: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    const user = await this.usersService.findOne(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      // Log failed login attempt
      if (user) {
        await this.auditService.logEvent(user.userId, 'Failed login attempt');
      }
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.name, sub: user.userId, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  /**
   * Generate MFA token (placeholder).
   */
  async generateMfaToken(userId: string): Promise<{ mfaToken: string }> {
    const mfaToken = `MFA-${Math.random().toString(36).substring(2, 10)}`;
    await this.auditService.logEvent(userId, 'MFA token generated');
    return { mfaToken };
  }
}

