import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';
import { Size } from './model/size.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Size])],
  controllers: [SizeController],
  providers: [SizeService],
  exports: [SizeService]
})
export class SizeModule {}
