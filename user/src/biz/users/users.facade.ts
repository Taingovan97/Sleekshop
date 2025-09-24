import { Injectable } from '@nestjs/common';
import { UserReadPort } from './ports/user-read.port';
import { UsersService } from '../../modules/users/users.service';
import { UsersRepository } from '../../modules/users/users.repository';

@Injectable()
export class UsersFacade implements UserReadPort {
  constructor(private readonly userService: UsersService) {}

  async getCredentialsByUsername(username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      return null;
    }

    return {
      userId: user.userId,
      username: user.username,
      passwordHash: user.passwordHash,
      isActive: user.isActive,
    };
  }

  async getRoleCodesByUserId(userId: string): Promise<string[]> {
    return this.userService.getRoleCodesByUserId(userId);
  }
}
