import { Injectable } from '@nestjs/common'
import { Product } from './models/product.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateProductDto } from './dto'
import { FileService } from '../file/file.service'
import { Category } from '../categories/model/category.model'
import { UpdateProductDto } from './dto/updatedto'
import { Size } from '../size/model/size.model'

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Product) private readonly productRepository: typeof Product,
		@InjectModel(Category) private readonly categoryRepository: typeof Category,
		private fileService: FileService,
	) {}

	async create(dto: CreateProductDto, image) {
		const imgaeID = await this.fileService.createFile(image)
		const category = await this.categoryRepository.findOne({
			where: { name: dto.category },
		})
		const newProduct = {
			name: dto.name,
			description: dto.description,
			price: dto.price,
			image: imgaeID,
			category: category.id,
		}
		const myProduct = await this.productRepository.create(newProduct)
		return myProduct
	}

	async getAll(): Promise<Product[]> {
		return this.productRepository.findAll({
			include: [Size], // Include the Size model to fetch associated sizes
		})
	}

	async update(dto: UpdateProductDto, image, id, sizesToAdd: number[]) {
		const product = await this.productRepository.findOne({ where: { id } })
		if (image) {
			const imgaeID = await this.fileService.createFile(image)
			product.image = imgaeID
		}
		product.update(dto)
		await product.save()

		if (sizesToAdd && sizesToAdd.length > 0) {
			const sizes = await Size.findAll({ where: { id: sizesToAdd } })
			await product.$set('size', sizes)
		}

		return product
	}

	async updateSale(id: number[]) {
		try {
			const products = await this.productRepository.findAll({ where: { id } })

			products.forEach((product) => {
				product.sale = !product.sale
			})

            return await Promise.all(products.map((product) => product.save()))

		} catch (e) {
			console.log(e)
		}
	}

    async updateActual(id: number[]) {
		try {
			const products = await this.productRepository.findAll({ where: { id } })

			products.forEach((product) => {
				product.actual = !product.actual
			})

            return await Promise.all(products.map((product) => product.save()))
            
		} catch (e) {
			console.log(e)
		}
	}

    async getSaleProduct(): Promise<Product[]> {
        return await this.productRepository.findAll({where: {sale : true}})
    }

    async getActualProduct(): Promise<Product[]> {
        return await this.productRepository.findAll({where: {actual : true}})
    }

	async getById(id): Promise<Product> {
        return await this.productRepository.findOne({where: {id}, include: [
			{
			  model: Size,
			  attributes: ['id','size'], 
			},
		  ]})
    }
}
