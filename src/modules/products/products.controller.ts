import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  Redirect,
  HttpStatus,
  HttpCode,
  Header,
} from '@nestjs/common';
import { CreateProductDto } from './DTO/create-product.dto';
import { UpdateProductDto } from './DTO/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  //   @Redirect('https://google.com', 301) // При переходе по этой ссылке переадресация на гугл
  getById2(@Param('id') id: string) {
    return this.productsService.getById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Remove: ${id}`
  }

  @Put(':id')
  update(@Body() UpdateProductDto: UpdateProductDto, @Param('id') id: string) {
    return 'Update' + id
  }
}
