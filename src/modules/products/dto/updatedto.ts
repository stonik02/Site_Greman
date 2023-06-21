import { ApiProperty } from "@nestjs/swagger"
import { IsOptional } from "class-validator"
import { BelongsToMany, ForeignKey } from "sequelize-typescript"
import { ProductSize, Size } from "src/modules/size/model/size.model"

export class UpdateProductDto{
    @ApiProperty()
    @IsOptional()
    name: string

    @ApiProperty()
    @IsOptional()
    description: string


    @ApiProperty()
    @IsOptional()
    price: string

    @ApiProperty()
    @IsOptional()
    image:string


    @ApiProperty()
    @IsOptional()
    category: string

    
    
    @BelongsToMany(() => Size, ()=> ProductSize)
    size?: Size[]
}