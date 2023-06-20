import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './model/model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private readonly roleRepository : typeof Role) {}



    async getRoleByValue(value: string) {
        return await this.roleRepository.findOne({where: {value}})
    }
}
