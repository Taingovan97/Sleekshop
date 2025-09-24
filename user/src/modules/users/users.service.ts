import { Injectable } from '@nestjs/common';
import {UsersRepository} from "./users.repository";

export type UserCredentials = {
    userId: string;
    username: string;
    passwordHash: string;
    isActive: boolean;
};

@Injectable()
export class UsersService {
    constructor(private readonly userRepo: UsersRepository) {
    }

    async findByUsername(username: string): Promise<UserCredentials | null> {
        const user = await this.userRepo.findByUsername(username);
        if (!user) {
            return null;
        }

        return {
            userId: user.id,
            username: user.username,
            passwordHash: user.passwordHash,
            isActive: user.isActive,
        };
    }

    async getRoleCodesByUserId(userId: string): Promise<string[]> {
        return this.userRepo.getRoleCodesByUserId(userId);
    }
}
