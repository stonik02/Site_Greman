
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "src/modules/orders/model/orders.model";
import { Product } from "src/modules/products/models/product.model";
import { Size } from "src/modules/size/model/size.model";
import { User } from "src/modules/users/models/users.model";

@Table
export class Busket extends Model{

    @Column
    quantity: string

    @ForeignKey(() => Product)
    product: Product

    @Column
    user: string

    @ForeignKey(() => Size)
    size: Size

    @ForeignKey(() => Order)
    order: Order

    @BelongsTo(() => Order)
    orders: Order;

    @BelongsTo(() => Product)
    products: Product;

    @BelongsTo(() => Size)
    sizes: Product;



}