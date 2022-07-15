import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,} from "typeorm"

@Entity(`access`)
export class Access extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		nullable: false
	})
	name!: string

}