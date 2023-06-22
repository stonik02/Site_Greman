import {
	BelongsTo,
	Column,
	Default,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Busket } from 'src/modules/busket/model/busket.model'
import { Order } from 'src/modules/orders/model/orders.model'

@Table
export class User extends Model {
	@Column
	firstName?: string

	@Column
	secondName?: string

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

	@HasMany(() => Order)
	orders: Order[]
}
