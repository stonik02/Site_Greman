import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Size } from './model/size.model';
import { CreateSizeDTO } from './dto';

@Injectable()
export class SizeService {
    getAll(): Promise<Size[]> {
        return this.sizeRepository.findAll()
    }
    constructor(@InjectModel(Size) private readonly sizeRepository : typeof Size) {}

    async create(dto: CreateSizeDTO): Promise<Size> {
        const newSize = {
            size: dto.size,
        }
        return this.sizeRepository.create(newSize)
    }

}
