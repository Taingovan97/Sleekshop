import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UserCreatedHandler } from './events/user-created.handler';
import { UserUpdatedHandler } from './events/user-updated.handler';
import {UsersController} from "./users.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Role} from "./roles.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService, UsersRepository, UserCreatedHandler, UserUpdatedHandler],
  controllers: [UsersController],
})
export class UsersModule {}
