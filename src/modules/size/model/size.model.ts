
import { BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Busket } from "src/modules/busket/model/busket.model";
import { OrderedItem } from "src/modules/ordered_item/model/ordered_item.model";
import { Product } from "src/modules/products/models/product.model";

@Table
export class Size extends Model{

    @Column
    size: string

    @BelongsToMany(() => Product, ()=> ProductSize)
    products?: Product[]

    @HasMany(() => Busket)
    buskets: Busket[]

    @HasMany(() => OrderedItem)
    orderedItem: OrderedItem[]




}


@Table
export class ProductSize extends Model{

    @ForeignKey(() => Product)
    product: Product

    @ForeignKey(() => Size)
    size: Size
}