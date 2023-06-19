import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { ForeignKey } from "sequelize-typescript";
import { Size } from "src/modules/size/model/size.model";

export class CreateProductDto {
    
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    description: string


    @ApiProperty()
    @IsString()
    price: string

    @ApiProperty()
    image:string


    @ApiProperty()
    @IsString()
    category: string


    @ForeignKey(()=> Size)
    @IsOptional()
    size = Size

}


