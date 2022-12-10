import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity(`areas`)
export class Area extends BaseEntity {

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