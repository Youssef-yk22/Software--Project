import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/createnotification.dto';

@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getNotifications(@Req() req) {
    const userId = req.user.userid;
    return this.notificationService.getNotifications(userId);
  }

  @Post()
  async createNotification(
    @Req() req,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    const userId = req.user.userid;
    return this.notificationService.createNotification(
      userId,
      createNotificationDto,
    );
  }
}
