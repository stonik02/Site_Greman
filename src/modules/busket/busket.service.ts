import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Busket } from './model/busket.model'
import { CreateBusketDto } from './dto'
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util'
import { AppError } from 'src/common/constants/errors'
import { Product } from '../products/models/product.model'
import { Size } from '../size/model/size.model'

@Injectable()
export class BusketService {
	constructor(
		@InjectModel(Busket) private readonly busketRepository: typeof Busket,
	) {}

	async createBusket(dto: CreateBusketDto, id): Promise<Busket> {
		console.log(dto)
		console.log(id)
		const newBusket = await {
			quantity: dto.quantity,
			product: dto.product,
			user: id,
			size: dto.size,
		}

		return this.busketRepository.create(newBusket)
	}

	async deleteBusket(id: any): Promise<boolean> {
		try {
			await this.busketRepository.destroy({ where: { id } })
			return true
		} catch (e) {
			throw new BadRequestException(AppError.WRONG_DATA)
		}
	}

	async getBusketsById(busketsID: number[]): Promise<Busket[]> {
		const buckets = await this.busketRepository.findAll({
			where: { id: busketsID },
		})
		return buckets
	}

	async getBusketsByUserId(id): Promise<Busket[]> {
		const buckets = await this.busketRepository.findAll({
			where: { user: id },
            attributes: ['id', 'quantity', 'user'],
            
			include: [
				{
					model: Product,
					attributes: ['id','name', 'price', 'image'],
				},
                {
                    model: Size,
                    attributes: ['id', 'size']
                }
			],
		})
		return buckets
	}

	async deleteAllBuskets(buskets: number[]): Promise<Boolean> {
		await this.busketRepository.destroy({ where: { id: buskets } })
		return true
	}
}
