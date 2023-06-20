import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto';
import { JWTAuthGuard } from '../auth/jwt-guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly oderService: OrdersService) {}

    @UseGuards(JWTAuthGuard)
    @Post('create')
    createOrder(@Body() dto: CreateOrderDto, @Req() req) {
        const user = req.user
        return this.oderService.createOrder(dto, user.email)
        
    }
}
