import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dtos/login.dto";
import {Public} from "./jwt.auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.auth.login(body.username, body.password);
  }
}
