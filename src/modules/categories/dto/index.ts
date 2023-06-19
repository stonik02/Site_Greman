import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDTO {
    
    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    image:string

}
