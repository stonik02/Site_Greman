import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/models/users.model';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import * as bcrypt from 'bcrypt'
import { AppError } from 'src/common/constants/errors';
import { where } from 'sequelize';
import { Busket } from '../busket/model/busket.model';
import { Product } from '../products/models/product.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userRepository : typeof User) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10)
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({where: {email}})
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({where: {id}})
  }

  async createUser(dto: CreateUserDTO): Promise<User> {
    dto.password = await this.hashPassword(dto.password)
    const newUser = {
      firstName: dto.firstName,
      secondName: dto.secondName,
      username : dto.username,
      email: dto.email,
      password: dto.password
    }
    const user = await this.userRepository.create(newUser)
    return user
  }

  async publicUser(email) {
    return this.userRepository.findOne({
      where: {email},
      attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
    })
  }

  async updateUser(email: string, dto:UpdateUserDTO): Promise<UpdateUserDTO> {
    await this.userRepository.update(dto, {where: {email}})
    return dto
  }

  async deleteUser(email: string) {
    await this.userRepository.destroy({where: {email}})
    return true
  }

  async GetUser(email: string): Promise<User> {
    const user = await this.userRepository.findOne({where: {email}})
    return user
  }

  async myBusket(id) {
    return await this.userRepository.findOne({where: {id}, 
      include: [{ model: Busket, include: [Product] }],
      attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
    })
  }
}
