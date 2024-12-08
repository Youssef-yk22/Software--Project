import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from './models/notification.schema';
import { CreateNotificationDto } from './dto/createnotification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async createNotification(
    userId: string | null,
    createNotificationDto: CreateNotificationDto,
  ) {
    const notification = new this.notificationModel({
      userId,
      ...createNotificationDto,
    });
    return notification.save();
  }

  async getNotifications(userId: string) {
    return this.notificationModel
      .find({ userId })
      .sort({ timestamp: -1 })
      .exec();
  }
  /**
   * Broadcast a global notification.
   * @param content - The notification content.
   */
  async broadcastNotification(content: string) {
    const notification = new this.notificationModel({ content, global: true });
    return notification.save();
  }
  /**
   * Fetch all global notifications.
   */
  async getGlobalNotifications() {
    return this.notificationModel.find({ global: true }).exec();
  }
}
