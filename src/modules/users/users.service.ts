import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/models/users.model';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import * as bcrypt from 'bcrypt'
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
    const user = await this.userRepository.create({...dto})
    await user.save()
    return user
  }

  async publicUser(email) {
    return this.userRepository.findOne({
      where: {email},
      attributes: {exclude: ['password', 'createdAt', 'updatedAt']}

    })
  }

  async allUser() {
    return this.userRepository.findAll({
      attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
      include: {all:true}
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


}
