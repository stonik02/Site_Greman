import { Module } from '@nestjs/common';
import { BusketController } from './busket.controller';
import { BusketService } from './busket.service';
import { Busket } from './model/busket.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [BusketService, TokenService, JwtService],
    controllers: [BusketController],
    imports: [SequelizeModule.forFeature([Busket])],
    exports: [BusketService]
})
export class BusketModule {}
