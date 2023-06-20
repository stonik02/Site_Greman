import { BelongsTo, Column, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Busket } from "src/modules/busket/model/busket.model";
import { Order } from "src/modules/orders/model/orders.model";
import { Role } from "src/modules/roles/model/model";

@Table
export class User extends Model{
    @Column
    firstName: string

    @Column
    secondName: string

    @Column
    username: string

    @Column
    email: string

    @Column
    password: string

    
    @Default(false)
    @Column
    active: boolean


    @Default(false)
    @Column
    is_staff: boolean

    @ForeignKey(() => Role)
    roleId: Role

    @BelongsTo(() => Role)
    role: Role

    @HasMany(() => Busket)
    buskets: Busket[]


    @HasMany(() => Order)
    orders: Order[]


}