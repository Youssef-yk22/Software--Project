import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './models/users.schema';
import { createUserDto } from './dto/createuser.dto';
import { updateUserDto } from './dto/updateuser.dto';
import { v4 as uuidv4 } from 'uuid';

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
    const { name, email, password, role } = createUserDto;

    // Ensure password is not empty and is a string
    if (!password || typeof password !== 'string') {
      throw new Error('Password must be a string and cannot be empty.');
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      userId: uuidv4(),
      name,
      email,
      passwordHash, // make sure this is the field name in the schema
      role,
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
  async login(email: string, password: string): Promise<{ accessToken: string }> {
    // Find the user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the provided password with the stored hash
    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Create a payload for the JWT
    const payload = {
      username: user.name,
      sub: user._id, // Typically use _id from MongoDB
      role: user.role
    };

    // Generate the JWT
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
  async findById(userId: string): Promise<User | undefined> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
}
