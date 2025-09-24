import {Module} from '@nestjs/common';
import {UsersFacade} from './users.facade';
import {UsersModule} from "../../modules/users/users.module";
import {USER_READ_PORT} from "./ports/user-read.port";

@Module({
    imports: [UsersModule],
    providers: [
        UsersFacade,
        {
            provide: USER_READ_PORT,
            useExisting: UsersFacade,
        }
    ],
    exports: [USER_READ_PORT],
})
export class UsersApplicationModule {
}
