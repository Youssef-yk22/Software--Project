import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/sendmessage.dto';
import { Put } from '@nestjs/common';
import { UpdateMessageDto } from './dto/updatemessage.dto';

@Controller('chats')
@UseGuards(AuthGuard('jwt'))
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(':courseId')
  async sendMessage(
    @Req() req,
    @Param('courseId') courseId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    const userId = req.user.userid;
    return this.chatService.sendMessage(courseId, userId, sendMessageDto);
  }

  @Get(':courseId')
  async getMessages(@Param('courseId') courseId: string) {
    return this.chatService.getMessages(courseId);
  }
  @Put(':courseId/:messageId')
  async updateMessage(
    @Param('courseId') courseId: string,
    @Param('messageId') messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.chatService.updateMessage(
      courseId,
      messageId,
      updateMessageDto,
    );
  }
  @Post('courses/:courseId/chats/:messageId/reply')
  async respondToQuery(
    @Req() req,
    @Param('courseId') courseId: string,
    @Param('messageId') messageId: string,
    @Body('reply') reply: string,
  ) {
    const instructorId = req.user.userid;
    return this.chatService.respondToQuery(
      courseId,
      instructorId,
      messageId,
      reply,
    );
  }
}
