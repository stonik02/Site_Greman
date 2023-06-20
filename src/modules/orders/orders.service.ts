import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderedItem } from '../ordered_item/model/ordered_item.model';
import { Order } from './model/orders.model';
import { CreateOrderDto } from './dto';
import { UsersService } from '../users/users.service';
import { BusketService } from '../busket/busket.service';
import { Busket } from '../busket/model/busket.model';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(OrderedItem) private readonly orderedItemRepository : typeof OrderedItem,
                @InjectModel(Order) private readonly orderRepository: typeof Order,
                private readonly userService: UsersService,
                private readonly busketService: BusketService) {}


    async createOrder(dto: CreateOrderDto, email) {
        const user = await this.userService.findUserByEmail(email) 
        let busketsId = dto.buskets

        const buskets = await this.busketService.getBusketsById(busketsId)
        if (buskets.length < 1) {
             throw new BadRequestException(AppError.WRONG_DATA)
        }
        console.log(buskets)

        const orderedItem = await Promise.all(
            buskets.map(async (busket: Busket) => {
              const { product, size, quantity } = busket;
              const orderedItem = await this.orderedItemRepository.create({
                quantity,
                product,
                size,
                order: null,
              });
              return orderedItem;
            }),
          );
      
          const order = await this.orderRepository.create({
            status: 'Заказ создан',
            city: dto.city,
            index: dto.index,
            user: user.id,
            orderedItem: orderedItem.map((item) => item.id),
          });

          await Promise.all(
            orderedItem.map(async (item) => {
              item.order = order.id;
              await item.save();
            }),
          )

          await this.busketService.deleteAllBuskets(busketsId)

          const orderWithItems = await this.orderRepository.findByPk(order.id, {
            include: [OrderedItem],
          });

          return orderWithItems

    }
}
