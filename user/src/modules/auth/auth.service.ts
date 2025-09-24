import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import type {UserReadPort} from '../../biz/users/ports/user-read.port';
import {USER_READ_PORT} from '../../biz/users/ports/user-read.port';
import * as argon2 from 'argon2';
import {JwtService} from "@nestjs/jwt";
import {AuthToken} from "./dtos/auth.types";

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_READ_PORT) private readonly users: UserReadPort,
        private readonly jwt: JwtService,
    ) {
    }

    async validateAndGetUser(username: string, password: string) {
        const creds = await this.users.getCredentialsByUsername(username);
        if (!creds || !creds.isActive) throw new UnauthorizedException('Invalid credentials');

        const ok = await argon2.verify(creds.passwordHash, password);
        if (!ok) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const roles = await this.users.getRoleCodesByUserId(creds.userId);
        return {
            userId: creds.userId,
            username: creds.username,
            roles,
        };
    }

    async login(username: string, password: string): Promise<AuthToken> {
        const {userId, username: uname, roles} = await this.validateAndGetUser(username, password);

        const accessToken = await this.jwt.signAsync({sub: userId, username: uname, roles});

        return {accessToken};
    }
}
