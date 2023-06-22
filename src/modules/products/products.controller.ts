import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { Product } from './models/product.model'
import { UpdateProductDto } from './dto/updatedto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@ApiResponse({ status: 201, type: CreateProductDto })
	@Post('')
	@UseInterceptors(FileInterceptor('image'))
	createProduct(@Body() dto: CreateProductDto, @UploadedFile() image) {
		return this.productsService.create(dto, image)
	}

	@ApiResponse({ status: 200, type: CreateProductDto })
	@Get('')
	getAllProducts(): Promise<Product[]> {
		return this.productsService.getAll()
	}

	@ApiResponse({ status: 200, type: CreateProductDto })
	@Patch('update/:id')
	@UseInterceptors(FileInterceptor('image'))
	updateProduct(
		@Param('id') id,
		@Body() dto: UpdateProductDto,
		@UploadedFile() image,
		@Body('size') sizesToAdd: number[],
	) {
		return this.productsService.update(dto, image, id, sizesToAdd)
	}

  @Post('update-sale')
  updateSale(@Body('id') id: number[]) {
    return this.productsService.updateSale(id)
  }

  @Post('update-actual')
  updateActual(@Body('id') id: number[]) {
    return this.productsService.updateActual(id)
  }

  @Get('sale')
  getSaleProduct(): Promise<Product[]> {
    return this.productsService.getSaleProduct()
  }

  @Get('actual')
  getActualProduct(): Promise<Product[]> {
    return this.productsService.getActualProduct()
  }

  @Get(':id')
  getById(@Param('id') id): Promise<Product> {
	return this.productsService.getById(id)
  }
}
