import { Column, Default, HasMany, Model, Table } from "sequelize-typescript";
import { Busket } from "src/modules/busket/model/busket.model";
import { Order } from "src/modules/orders/model/orders.model";
import { User } from "src/modules/users/models/users.model";

@Table
export class Role extends Model{
    
    @Column({unique : true})
    value: string

    @HasMany(() => User)
    buskets: User[]

}