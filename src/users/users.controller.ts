import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createuser.dto';
import { updateUserDto } from './dto/updateuser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../decorators/roles';
import { RolesGuard } from '../guards/roles';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Endpoint for user registration.
   * @param createUserDto - The user data for registration.
   * @returns The created user record.
   */
  @Post('register')
  async register(@Body() createUserDto: createUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Endpoint for user login.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns A JWT token if the credentials are valid.
   */
  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    return this.usersService.login(email, password);
  }

  /**
   * Endpoint to get all users. Protected and requires admin access.
   * @returns A list of all users.
   */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  /**
   * Endpoint to get a specific user by their ID.
   * Protected and requires authentication.
   * @param id - The unique ID of the user.
   * @returns The user record, or null if not found.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Endpoint to update a user's details.
   * Protected and requires authentication.
   * @param id - The user's unique ID.
   * @param updateUserDto - The updated user data.
   * @returns The updated user record, or null if not found.
   */
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: updateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Endpoint to update a user's password.
   * Protected and requires authentication.
   * @param id - The user's unique ID.
   * @param updatePasswordDto - The new password data.
   * @returns The updated user record with a hashed password.
   */
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/password')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, updatePasswordDto.newPassword);
  }

  /**
   * Endpoint to delete a user by their ID.
   * Protected and requires admin access.
   * @param id - The user's unique ID.
   * @returns The deleted user record, or null if not found.
   */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  /**
   * Endpoint to demonstrate role-based access control.
   * Requires the user to have the 'Admin' role.
   * @param req - The authenticated user's request object.
   * @returns A welcome message for Admin users.
   */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  @Get('admin')
  getAdminData(@Req() req) {
    return { message: `Welcome Admin ${req.user.username}` };
  }
}
