import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity(`type_equipments`)
export class TypeEquipment extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		type: `varchar`,
		nullable: false,
		default: `Sword`,
	})
	name!: string

	@Column({
		type: `varchar`,
		length: `32`,
		nullable: false,
		default: `Weapon`,
	})
	equipment!: string

	get isHouseItem(): boolean {
		return this.equipment === `hi` || this.equipment === `ho`
	}

}