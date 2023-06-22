import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './model/orders.model';
import { UserModule } from '../users/users.module';
import { BusketModule } from '../busket/busket.module';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Order]), UserModule, BusketModule],
  providers: [OrdersService, TokenService, JwtService],
  controllers: [OrdersController]
})
export class OrdersModule {}
