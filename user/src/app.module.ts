import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './modules/auth/auth.module';
import {UsersController} from './modules/users/users.controller';
import {UsersModule} from './modules/users/users.module';
import {UsersApplicationModule} from './biz/users/users.application.module';
import * as process from "node:process";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        AuthModule,
        UsersModule,
        UsersApplicationModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST ?? 'localhost',
            port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
            username: process.env.POSTGRES_USER ?? 'postgres',
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB ?? 'sleekshop',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
    ],
    controllers: [AppController, UsersController],
    providers: [AppService],
})
export class AppModule {
}
