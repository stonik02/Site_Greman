import { Module } from "@nestjs/common";
import {UsersController} from "./users.controller"
import {UsersService} from "./users.service"
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/users.model";
import { TokenModule } from "../token/token.module";
import { TokenService } from "../token/token.service";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";


@Module({
    imports: [SequelizeModule.forFeature([User]), AuthModule],
    controllers: [UsersController],
    providers: [UsersService, TokenService, JwtService],
    exports: [UsersService]
    
})

export class UserModule {}