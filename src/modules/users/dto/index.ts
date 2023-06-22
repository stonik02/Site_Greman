import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDTO {
	@ApiProperty()
	firstName?: string | null

	@ApiProperty()
	@IsString()
	secondName?: string | null

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	email: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	password: string
    
	@ApiProperty()
	id: number | null
}

export class UpdateUserDTO {
	@ApiProperty()
	@IsString()
	firstName: string

	@ApiProperty()
	@IsString()
	secondName: string

	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	email: string
}
