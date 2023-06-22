import { Body, Controller, Get, Param, Post, Redirect, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { AuthUserResponseDTO, LoginUserDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/models/users.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}


    @ApiResponse({status: 201, type: CreateUserDTO})
    @Post('register')
    register(@Body() dto: CreateUserDTO): Promise<User>{
        return this.authService.registerUsers(dto)
    }

    @ApiResponse({status: 200, type: AuthUserResponseDTO})
    @Post('login')
    login(@Body() dto: LoginUserDTO): Promise<AuthUserResponseDTO> {
        return this.authService.loginUser(dto)
    }

    @Get('confirm/:token')
    @Redirect('http://localhost:8080/auth') // После активации сделать переход на страницу авторизации на фронте
    confirm(@Param('token') token): Promise<User> {
        return this.authService.confirm(token)
    }
 }
