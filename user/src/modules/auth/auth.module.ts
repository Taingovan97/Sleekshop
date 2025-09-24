import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersApplicationModule } from '../../biz/users/users.application.module';

@Module({
  imports: [UsersApplicationModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
