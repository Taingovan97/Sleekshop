import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersApplicationModule } from '../../biz/users/users.application.module';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
      UsersApplicationModule,
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '15m' },
      }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
