import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common'

import { UsersService } from './users.service'
import { UpdateUserDTO } from './dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './models/users.model'
import { JWTAuthGuard } from '../auth/jwt-guard'
import { Roles } from '../auth/has-roles.decorator'
import { RolesGuard } from '../auth/roles.guard'

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@ApiResponse({ status: 200, type: UpdateUserDTO })
	@UseGuards(JWTAuthGuard)
	@Patch('update')
	updateUser(
		@Body() updateDto: UpdateUserDTO,
		@Req() request,
	): Promise<UpdateUserDTO> {
		const user = request.user
		return this.userService.updateUser(user.email, updateDto)
	}

	@Get('all')
	allUsers(): Promise<User[]> {
		return this.userService.allUser()
	}

	@ApiResponse({ status: 200, type: Boolean })
	@UseGuards(JWTAuthGuard)
	@Delete('me')
	deleteUser(@Req() request) {
		const user = request.user
		return this.userService.deleteUser(user.email)
	}

	@ApiResponse({ status: 200, type: Boolean })
	// @Roles('user')
	// @UseGuards(RolesGuard)
	@UseGuards(JWTAuthGuard)
	@Get('me')
	async GetData(@Req() request): Promise<User> {
		const user = await request.user
		console.log(user.user)
		return this.userService.GetUser(user.email)
	}


}
