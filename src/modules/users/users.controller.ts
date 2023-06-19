import {
    Body,
    Controller, Delete, Get, Patch, Post, Req, UseGuards,
 
  } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { JWTAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}


  @ApiResponse({status: 200, type: UpdateUserDTO})
  @UseGuards(JWTAuthGuard)
  @Patch('update')
  updateUser(@Body() updateDto: UpdateUserDTO, @Req() request): Promise<UpdateUserDTO> {
    const user = request.user
    return this.userService.updateUser(user.email, updateDto)
  }

  @ApiResponse({status: 200, type: Boolean})
  @UseGuards(JWTAuthGuard)
  @Delete('me')
  deleteUser(@Req() request) {
    const user = request.user
    return this.userService.deleteUser(user.email)
  }

  @ApiResponse({status: 200, type: UpdateUserDTO})
  @UseGuards(JWTAuthGuard)
  @Get('busket')
  myBusket(@Req() req) {
    return this.userService.myBusket(req.user.id)
  }

}
