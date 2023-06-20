import { Module } from '@nestjs/common';
import { OrderedItemService } from './ordered_item.service';
import { OrderedItemController } from './ordered_item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderedItem } from './model/ordered_item.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderedItem])],
  providers: [OrderedItemService],
  controllers: [OrderedItemController]
})
export class OrderedItemModule {}
