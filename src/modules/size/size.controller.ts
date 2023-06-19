import { Body, Controller, Get, Post } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDTO } from './dto';
import { Size } from './model/size.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('size')
@Controller('size')
export class SizeController {
    constructor(private readonly sizeService: SizeService) {}

    @ApiResponse({status: 201, type: CreateSizeDTO})
    @Post('')
    create(@Body() dto: CreateSizeDTO): Promise<Size> {
        return this.sizeService.create(dto)
    }

    @ApiResponse({status: 200, type: CreateSizeDTO})
    @Get('all')
    getAll(): Promise<Size[]> {
        return this.sizeService.getAll()
    }
}
