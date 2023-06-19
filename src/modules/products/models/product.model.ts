
import { BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Busket } from "src/modules/busket/model/busket.model";
import { Category } from "src/modules/categories/model/category.model";
import { ProductSize, Size } from "src/modules/size/model/size.model";

@Table
export class Product extends Model{

    @Column
    name: string

    @Column
    description: string

    @Column
    price: string

    @Column
    image: string

    @ForeignKey(() => Category)
    category: Category

    @BelongsToMany(() => Size, ()=> ProductSize)
    size?: Size[]

    @HasMany(() => Busket)
    buskets: Busket[]




}