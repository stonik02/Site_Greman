
import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Busket } from "src/modules/busket/model/busket.model";

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

    @HasMany(() => Busket, { foreignKey: 'order' })
    busket: Busket[]







}