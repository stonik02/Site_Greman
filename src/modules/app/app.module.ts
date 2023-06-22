import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize'
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from '../users/models/users.model';
import { ProductsModule } from '../products/products.module';
import { UserModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { CategoriesModule } from '../categories/categories.module';
import { Category } from '../categories/model/category.model';
import { Product } from '../products/models/product.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SizeModule } from '../size/size.module';
import { ProductSize, Size } from '../size/model/size.model';
import { FileModule } from '../file/file.module';
import { BusketModule } from '../busket/busket.module';
import { Busket } from '../busket/model/busket.model';
import { Order } from '../orders/model/orders.model';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load: []
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '..', '..','static')
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: "postgres",
      host: configService.get('db_host'),
      port: configService.get('db_port'),
      username: configService.get('db_user'),
      password: "qwerty123",
      database: configService.get('db_name'),
      synchronize: true,
      autoLoadModels: true,
      models: [User ,Category, Product, Size, ProductSize, Busket, Order]
    }),
  }),
   ProductsModule, UserModule, AuthModule, TokenModule, CategoriesModule, ProductsModule, SizeModule, FileModule, BusketModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
