import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class LoginUserDTO {
    @ApiProperty()
    @IsString()
    email:string

    @ApiProperty()
    @IsString()
    password: string
}

export class AuthUserResponseDTO {

    @ApiProperty()
    @IsString()
    email:string

    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    jwt: string

}

export default {
    LoginUserDTO,
    AuthUserResponseDTO,
};