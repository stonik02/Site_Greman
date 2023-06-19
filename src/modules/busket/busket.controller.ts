import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BusketService } from './busket.service';
import { CreateBusketDto } from './dto';
import { Busket } from './model/busket.model';
import { JWTAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('busket')
@Controller('busket')
export class BusketController {
    constructor(private readonly busketService: BusketService) {}

    @ApiResponse({status: 201, type: CreateBusketDto})
    @UseGuards(JWTAuthGuard)
    @Post('add')
    createBusket(@Body() dto: CreateBusketDto, @Req() req): Promise<Busket> {
        return this.busketService.createBusket(dto, req.user.id)
    }

    @ApiResponse({status: 201, type: Boolean})
    @UseGuards(JWTAuthGuard)
    @Delete('delete/:id')
    deleteBusket(@Param('id') id): Promise<boolean> {
        return this.busketService.deleteBusket(id)
    }

}
