import { Busket } from "src/modules/busket/model/busket.model"

export class CreateOrderDto {

    buskets: number[]

    city?: string
    
    index?: string
}