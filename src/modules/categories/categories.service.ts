import { Injectable } from '@nestjs/common';
import { CreateCategoryDTO } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { FileService } from '../file/file.service';
import { Product } from '../products/models/product.model';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel(Category) private readonly categoryRepository : typeof Category,
                private fileService: FileService) {}

    async create(dto: CreateCategoryDTO, image): Promise<CreateCategoryDTO> {
        const imgaeID = await this.fileService.createFile(image)
        const category = {
            name: dto.name,
            description: dto.description,
            image: imgaeID
        }
        return this.categoryRepository.create(category)
    }

    async getAll(): Promise<CreateCategoryDTO[]> {
        return await this.categoryRepository.findAll()
    }

    async getById(id: any): Promise<CreateCategoryDTO> {
        try {
            const category = await this.categoryRepository.findOne({where: {id}, include: [Product]})
            return category
        } catch(e) {
            console.log(e)
        }
    }
}
