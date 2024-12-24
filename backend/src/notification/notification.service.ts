import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from './models/notification.schema';
import { CreateNotificationDto } from './dto/createnotification.dto';
import { User, UserDocument } from 'src/users/models/users.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    @InjectModel('User') private userModel: Model<User>,
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
    try {
      // Get all users
      const users = await this.userModel.find().exec();
      console.log(`Found ${users.length} users to notify`);

      const notifications = [];

      // Create notifications for all users
      for (const user of users) {
        try {
          // Ensure we have a valid string ID before creating ObjectId
          const userId = user._id.toString();

          const notification = await this.notificationModel.create({
            userId: new Types.ObjectId(userId),
            content: content,
            read: false,
            global: true,
            timestamp: new Date(),
          });

          notifications.push(notification);
          console.log(`Created notification for user ${userId}`);
        } catch (error) {
          console.error(
            `Failed to create notification for user ${user._id}:`,
            error,
          );
        }
      }

      console.log(`Successfully created ${notifications.length} notifications`);

      return {
        success: true,
        message: 'Global announcement sent successfully',
        notificationsCount: notifications.length,
        notifications: notifications.map((notification) => ({
          _id: notification._id,
          userId: notification.userId,
          content: notification.content,
          global: notification.global,
          read: notification.read,
          timestamp: notification.timestamp,
        })),
      };
    } catch (error) {
      console.error('Error broadcasting notification:', error);
      throw new Error(`Failed to broadcast notification: ${error.message}`);
    }
  }
  /**
   * Fetch all global notifications.
   */
  async getGlobalNotifications() {
    return this.notificationModel.find({ global: true }).exec();
  }
}
