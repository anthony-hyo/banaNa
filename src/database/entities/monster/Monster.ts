import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity(`monsters`)
export class Monster extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		type: `varchar`,
		nullable: false,
		default: `battleon`,
		unique: true
	})
	name!: string

}