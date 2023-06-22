import { ApiProperty } from "@nestjs/swagger";


export class CreateBusketDto {
    
    @ApiProperty()
    product: string

    @ApiProperty()
    quantity: string

    @ApiProperty()
    size: string




}


