
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/modules/products/models/product.model";
import { Size } from "src/modules/size/model/size.model";
import { User } from "src/modules/users/models/users.model";

@Table
export class Busket extends Model{

    @Column
    quantity: string

    @ForeignKey(() => Product)
    product: Product

    @ForeignKey(() => User)
    user: User

    @ForeignKey(() => Size)
    size: Size

    @BelongsTo(() => Product)
    products: Product;



}