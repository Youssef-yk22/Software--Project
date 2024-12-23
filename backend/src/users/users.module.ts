import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './models/users.schema';
import { JwtStrategy } from '../Strategy/jwt';
import { RolesGuard } from '../guards/roles';

@Module({
  imports: [
    // Import MongoDB schema for users
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // Import Passport for handling authentication strategies
    PassportModule,
    // Configure JWT for token generation and validation
    JwtModule.register({
      secret: 'your_secret_key', // Replace with an environment variable for security
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService, // Business logic for user operations
    JwtStrategy, // JWT strategy for validating tokens
    RolesGuard, // Guard for role-based access control
  ],
  exports: [UsersService,MongooseModule],
})
export class UsersModule {}
