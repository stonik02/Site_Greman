
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "src/modules/orders/model/orders.model";

import { Product } from "src/modules/products/models/product.model";
import { Size } from "src/modules/size/model/size.model";


@Table
export class OrderedItem extends Model{

    @Column
    quantity: string

    @ForeignKey(() => Product)
    product: Product

    @ForeignKey(() => Size)
    size: Size

    @ForeignKey(() => Order)
    order: Order






}