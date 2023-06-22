import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BusketService } from './busket.service';
import { CreateBusketDto } from './dto';
import { Busket } from './model/busket.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/jwt-guard';

@ApiTags('busket')
@Controller('busket')
export class BusketController {
    constructor(private readonly busketService: BusketService) {}

    @ApiResponse({status: 201, type: CreateBusketDto})
    @Post('add/:id')
    createBusket(@Body() dto: CreateBusketDto, @Param('id') id): Promise<Busket> {
        console.log(id)
        return this.busketService.createBusket(dto, id)
    }

    @ApiResponse({status: 201, type: Boolean})
    @Delete('delete/:id')
    deleteBusket(@Param('id') id): Promise<boolean> {
        return this.busketService.deleteBusket(id)
    }

    @Get('get/:id')
    getBusketsByUserId(@Param('id') id): Promise<Busket[]> {
        return this.busketService.getBusketsByUserId(id)
    }
}
