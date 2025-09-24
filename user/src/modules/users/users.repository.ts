import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  // used for authentication, only get password hash and least amount of data needed
  async findByUsername(username: string) {
    return this.users.findOne({
      where: { username: username },
      select: {
        id: true,
        username: true,
        passwordHash: true, // needed for authentication
        isActive: true,
      } as any,
      relations: [],
    });
  }

  // used for authorization, only get role after successful authentication
  async getRoleCodesByUserId(userId: string): Promise<string[]> {
    const user = await this.users.findOne({
      where: { id: userId },
      select: { id: true } as any,
      relations: ['roles'],
    });
    return user?.roles?.map((r) => r.code) ?? [];
  }
}
