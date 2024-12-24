import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { authorizationGaurd } from 'src/guards/authotization';
import { Roles } from 'src/decorators/roles';
import { Role } from 'src/decorators/roles.enum';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

@Roles(Role.Instructor)
@UseGuards(authorizationGaurd)
  @Post()
  create(@Body() createDto: any) {
    return this.quizzesService.create(createDto);
  }
  @UseGuards(authorizationGaurd)
  @Get()
  findAll() {
    return this.quizzesService.findAll();
  }
  @UseGuards(authorizationGaurd)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }
@Roles(Role.Instructor)
@UseGuards(authorizationGaurd)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.quizzesService.update(id, updateDto);
  }
  @Roles(Role.Instructor || Role.Admin)
  @UseGuards(authorizationGaurd)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
}
