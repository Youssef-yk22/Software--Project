import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './models/chat.schema';
import { SendMessageDto } from './dto/sendmessage.dto';
import { UpdateMessageDto } from './dto/updatemessage.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async sendMessage(
    courseId: string,
    userId: string,
    sendMessageDto: SendMessageDto,
  ) {
    const chat = new this.chatModel({ courseId, userId, ...sendMessageDto });
    return chat.save();
  }

  async getMessages(courseId: string) {
    return this.chatModel.find({ courseId }).populate('userId', 'name').exec();
  }
  async updateMessage(
    courseId: string,
    messageId: string,
    updateMessageDto: UpdateMessageDto,
  ) {
    const message = await this.chatModel.findOneAndUpdate(
      { courseId, _id: messageId },
      updateMessageDto,
      { new: true },
    );
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }
  async respondToQuery(
    courseId: string,
    instructorId: string,
    messageId: string,
    reply: string,
  ) {
    const message = await this.chatModel.findById(messageId).exec();
    if (!message || message.courseId !== courseId) {
      throw new NotFoundException('Message not found or invalid course');
    }

    message.replies.push({
      senderId: instructorId,
      reply,
      timestamp: new Date(),
    });
    return message.save();
  }
}
