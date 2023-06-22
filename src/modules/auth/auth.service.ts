import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { CreateUserDTO } from '../users/dto'
import { AppError } from 'src/common/constants/errors'
import { AuthUserResponseDTO, LoginUserDTO } from './dto'
import * as bcrypt from 'bcrypt'
import { TokenService } from '../token/token.service'
import moment = require('moment')
import { mailer } from 'src/common/nodemailer'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/models/users.model'
import * as path from 'path'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly tokenService: TokenService,
	) {}

	async registerUsers(dto: CreateUserDTO): Promise<User> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (existUser) {
			throw new BadRequestException(AppError.USER_EXIST)
		}
		const user = await this.userService.createUser(dto)
		await this.sendConfirmation(user)
		return user
	}

	async sendConfirmation(user: User) {
		const Myuser = user.id
		const expireIn = 60 * 60 * 24
		const expireAt = moment().add(1, 'day').toISOString()

		const userData = {
			email: user.email,
			id: user.id,
		}
		const token = await this.tokenService.generateAccessToken(userData)

		const confirmLink = `${process.env.MY_URL}auth/confirm/${token}`
		console.log(user)

		const message = {
			from: 'Чисто магазик женских трусиков <denistestfortp@mail.ru>',
			to: user.email,
			subject: 'Verify user',
			html: `
                    <h3> Привет, ${user.firstName}! </h3>
                    <p> Перейди по ссылке чисто по братски пажэ <a href="${confirmLink}">link</a> ну бля реально перейди </p>
                    <img src="cid:0b4a9808-3baa-452e-8d06-6d1544da7980"/>
            `,
			attachments: [
				{
					filename: '0b4a9808-3baa-452e-8d06-6d1544da7980.jpg', // Имя файла
					path: path.resolve(
						__dirname,
						'..',
						'..',
						'..',
						'static',
						'0b4a9808-3baa-452e-8d06-6d1544da7980.jpg',
					), // Здесь путь до файла
					cid: '0b4a9808-3baa-452e-8d06-6d1544da7980', // Уникальный идентификатор изображения
				},
			],
		}

		mailer(message)
	}

	async confirm(token: string): Promise<User> {
		const jwt = {
			secret: process.env.SECRET_KEY,
		}
		const data = await this.tokenService.verifyAccessToken(token)
		console.log(data)
		const userData = data.user
		const user = await this.userService.findUserByEmail(userData.email)
		if (!user.active) {
			user.active = true
			user.save()
		}
		return user
	}

	async loginUser(dto: LoginUserDTO): Promise<AuthUserResponseDTO> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (!existUser) {
			throw new BadRequestException(AppError.USER_EXIST)
		}
		const validatePassword = await bcrypt.compare(
			dto.password,
			existUser.password,
		)
		if (!validatePassword) {
			throw new BadRequestException(AppError.WRONG_DATA)
		}
		if (!existUser.active) {
			throw new BadRequestException(AppError.NO_ACTIVATE)
		}

		const userData = {
			email: existUser.email,
			id: existUser.id,
			is_staff: existUser.is_staff,
			active: existUser.active,
		}
		const jwtAccess = await this.tokenService.generateAccessToken(userData)
		const jwtRefresh = await this.tokenService.generateRefreshToken(userData)
		const user = await this.userService.publicUser(dto.email)
		return { jwtAccess, jwtRefresh }
	}
}
