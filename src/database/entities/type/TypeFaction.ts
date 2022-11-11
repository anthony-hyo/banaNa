import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity(`type_factions`)
export class TypeFaction extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		type: `varchar`,
		nullable: false,
		default: `Legion`,
	})
	name!: string

}