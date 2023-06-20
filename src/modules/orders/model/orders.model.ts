
import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { OrderedItem } from "src/modules/ordered_item/model/ordered_item.model";
import { User } from "src/modules/users/models/users.model";

@Table
export class Order extends Model{

    @Column
    status: string

    @Column
    city: string

    @Column
    index: string

    @ForeignKey(() => User)
    user: User

    @HasMany(() => OrderedItem, { foreignKey: 'order' })
    orderedItem: OrderedItem[]







}