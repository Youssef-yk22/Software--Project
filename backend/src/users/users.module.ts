// users.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './models/users.schema';
import { JwtStrategy } from '../Strategy/jwt';
import { RolesGuard } from '../guards/roles';
import { ConditionalAuthGuard } from 'src/guards/authentication';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, RolesGuard, ConditionalAuthGuard],
  exports: [UsersService, MongooseModule, JwtModule],
})
export class UsersModule {}
