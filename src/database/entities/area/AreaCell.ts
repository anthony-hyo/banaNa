import {BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Area} from "./Area";

@Entity(`areas_cells`)
@Index((areaCell: AreaCell) => [
	areaCell.areaId,
	areaCell.cellId
], {
	unique: true
})
export class AreaCell extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 1,
		unique: false
	})
	areaId!: number

	@ManyToOne((type) => Area, (area: Area) => area.id)
	@JoinColumn()
	area!: Area

	@Column({
		type: `varchar`,
		nullable: false,
		default: `Enter`,
	})
	frame!: string

	@Column({
		type: `varchar`,
		nullable: false,
		default: `Spawn`,
	})
	pad!: string

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	cellId!: number

}