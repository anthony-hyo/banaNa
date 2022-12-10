import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity(`auras`)
export class Aura extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		type: `varchar`,
		nullable: false,
		default: `Damage over time`,
		unique: true
	})
	name!: string

}