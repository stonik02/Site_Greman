import { IsString } from "class-validator";

export class CreateUserDTO {
    @IsString()
    firstName: string

    @IsString()
    secondName: string

    @IsString()
    username:string

    @IsString()
    email:string

    @IsString()
    password: string
}