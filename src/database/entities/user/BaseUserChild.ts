import {BaseEntity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

export abstract class BaseUserChild extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		nullable: false,
		unsigned: true
	})
	userId!: number

	@OneToOne((type) => User, (user: User) => user.attribute)
	@JoinColumn()
	user!: User

}