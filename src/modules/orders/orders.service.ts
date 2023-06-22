import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Order } from './model/orders.model'
import { CreateOrderDto } from './dto'
import { UsersService } from '../users/users.service'
import { BusketService } from '../busket/busket.service'
import { Busket } from '../busket/model/busket.model'
import { AppError } from 'src/common/constants/errors'
import path from 'path'
import { mailer } from 'src/common/nodemailer'
import { Product } from '../products/models/product.model'

@Injectable()
export class OrdersService {
	constructor(
		@InjectModel(Order) private readonly orderRepository: typeof Order,
		private readonly userService: UsersService,
		private readonly busketService: BusketService,
	) {}

	async createOrder(dto: CreateOrderDto, email) {
		const user = await this.userService.findUserByEmail(email)
		let busketsId = dto.buskets

		const buskets = await this.busketService.getBusketsById(busketsId)
		if (buskets.length < 1) {
			throw new BadRequestException(AppError.NO_BUSKET)
		}
		// console.log(buskets)

		const order = await this.orderRepository.create({
			status: 'Заказ создан',
			city: dto.city,
			index: dto.index,
			user: user.id,
			// buskets: buskets.map((item) => item.id),
		})
		order.set({ buskets: buskets })

		await Promise.all(
			buskets.map(async (item) => {
				item.order = order.id
				await item.save()
			}),
		)

		// await this.busketService.deleteAllBuskets(busketsId)

		const orderWithItems = await this.orderRepository.findByPk(order.id, {
			include: [
				{
					model: Busket,
					attributes: ['id', 'quantity', 'size'],
					include: [
						{
							model: Product,
							attributes: ['id', 'name', 'price', 'image'],
						},
					],
				},
			],
		})
		this.sendAdminEmail(orderWithItems)

		return orderWithItems
	}

	async sendAdminEmail(order): Promise<void> {
		console.log(order);
		
		const orderCity = `<li>${order.city}</li>`;
		const orderIndex = `<li>${order.index}</li>`;
	  
		const orderNameItems = order.busket.map(item => `<li>${item.products.name}</li>`); // Create a separate list item for each orderName
		const orderQuantityItems = order.busket.map(item => `<li>${item.quantity}</li>`); // Create a separate list item for each orderQuantity
	  
		let orderItemsHTML = '';
		for (let i = 0; i < order.busket.length; i++) {
		  orderItemsHTML += `
			<ul>
			  <li>Название товара: ${orderNameItems[i]}</li>
			  <li>Количество товара: ${orderQuantityItems[i]}</li>
			</ul>
			<hr>
		  `;
		}
	  
		const message = {
		  from: 'Чисто магазик женских трусиков <denistestfortp@mail.ru>',
		  to: 'skitlsskitlovich@gmail.com',
		  subject: 'Verify user',
		  html: `
			<h1> Новый заказ! </h1>
			<ul>
			  <li>Город: ${orderCity}</li>
			  <li>Индекс: ${orderIndex}</li>
			  <h2> Список товаров:</h2>
			  <hr>
			</ul>
			${orderItemsHTML}
			<div id="body"></div>
			<img src="cid:0b4a9808-3baa-452e-8d06-6d1544da7980"/>
		  `,
		};
	  
		mailer(message);
	  }
}
