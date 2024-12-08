import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './models/users.schema';
import { createUserDto } from './dto/createuser.dto';
import { updateUserDto } from './dto/updateuser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  /**
   * Registers a new user by hashing their password and saving them in the database.
   * @param createUserDto - The user data for registration.
   * @returns The created user record.
   */
  async create(createUserDto: createUserDto): Promise<User> {
    const { passwordHash, ...userDetails } = createUserDto;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(passwordHash, 10);
    const newUser = new this.userModel({
      ...userDetails,
      passwordHash: hashedPassword,
    });

    return newUser.save();
  }

  /**
   * Retrieves all users from the database.
   * @returns A list of all users.
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * Retrieves a user by their unique ID.
   * @param id - The user's unique ID.
   * @returns The user record, or null if not found.
   */
  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  /**
   * Updates a user's details by their unique ID.
   * @param id - The user's unique ID.
   * @param updateUserDto - The updated user data.
   * @returns The updated user record, or null if not found.
   */
  async update(id: string, updateUserDto: updateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  /**
   * Updates a user's password by their unique ID.
   * @param id - The user's unique ID.
   * @param newPassword - The new plaintext password.
   * @returns The updated user record, or null if not found.
   */
  async updatePassword(id: string, newPassword: string): Promise<User | null> {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    return this.userModel
      .findByIdAndUpdate(id, { passwordHash: hashedPassword }, { new: true })
      .exec();
  }

  /**
   * Removes a user by their unique ID.
   * @param id - The user's unique ID.
   * @returns The deleted user record, or null if not found.
   */
  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  /**
   * Authenticates a user and generates a JWT token.
   * @param email - The user's email address.
   * @param password - The user's plaintext password.
   * @returns An object containing the generated JWT token.
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    // Find the user by email
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new Error('Invalid credentials');
    }

    // Create a payload for the JWT
    const payload = { username: user.name, sub: user.userId, role: user.role };

    // Generate and return the JWT
    return { accessToken: this.jwtService.sign(payload) };
  }
}
