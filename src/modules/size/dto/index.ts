import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSizeDTO {

    @ApiProperty()
    size: string
}

