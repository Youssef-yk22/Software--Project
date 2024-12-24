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
import { CoursesService } from './courses.service';
import { authorizationGaurd } from 'src/guards/authotization';
import { Role } from 'src/decorators/roles.enum';
import { Roles } from 'src/decorators/roles';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

@Roles(Role.Instructor)
@UseGuards(authorizationGaurd)
  @Post()
  create(@Body() createDto: any) {
    return this.coursesService.create(createDto);
  }
@UseGuards(authorizationGaurd)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  @UseGuards(authorizationGaurd)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }
  @Roles(Role.Instructor || Role.Admin)
  @UseGuards(authorizationGaurd)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.coursesService.update(id, updateDto);
  }
  @Roles(Role.Instructor || Role.Admin)
  @UseGuards(authorizationGaurd)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
