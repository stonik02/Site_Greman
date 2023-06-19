import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { Category } from '../categories/model/category.model';
import { FileModule } from '../file/file.module';

@Module({
    imports: [SequelizeModule.forFeature([Category]),SequelizeModule.forFeature([Product]) , FileModule],
    providers: [ProductsService],
    controllers: [ProductsController],

})
export class ProductsModule {}
