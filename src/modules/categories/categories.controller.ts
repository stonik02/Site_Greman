import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDTO } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}

  @ApiResponse({status: 201, type: CreateCategoryDTO})
//   @UseGuards(JWTAuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createCategory(@Body() dto: CreateCategoryDTO,
                 @UploadedFile() image
                ): Promise<CreateCategoryDTO> {
    return this.categoryService.create(dto, image)
  }

  @ApiResponse({status: 200, type: CreateCategoryDTO})
  @Get('')
  getAllCategories() {
    return this.categoryService.getAll()
  }

  @ApiResponse({status: 200, type: CreateCategoryDTO})
  @Get(':id')
  getCategoriesById(@Param('id') id): Promise<CreateCategoryDTO> {
      return this.categoryService.getById(id)
}


}


