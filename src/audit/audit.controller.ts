import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles';
import { Roles } from 'src/decorators/roles';

@Controller('audit')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('Admin') // Restrict access to admins
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  /**
   * Fetch all audit logs.
   * @returns List of all audit logs.
   */
  @Get('logs')
  async getAllLogs() {
    return this.auditService.getAllLogs();
  }
  /**
   * Fetch logs by user ID.
   */
  @Get('logs/user/:userId')
  async getLogsByUser(@Param('userId') userId: string) {
    return this.auditService.getLogsByUser(userId);
  }

  /**
   * Fetch suspicious activity logs.
   */
  @Get('logs/suspicious/:event')
  async getSuspiciousLogs(@Param('event') event: string) {
    return this.auditService.getSuspiciousLogs(event);
  }
}
