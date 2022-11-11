import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,} from "typeorm"

@Entity(`type_accesses`)
export class TypeAccess extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		type: `varchar`,
		nullable: false,
		default: `Player`
	})
	name!: string

}