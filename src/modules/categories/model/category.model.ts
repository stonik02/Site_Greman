
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "src/modules/products/models/product.model";

@Table
export class Category extends Model{

    @Column
    name: string

    @Column
    description: string

    @Column
    image: string

    @HasMany(() => Product)
    products: Product[]



}