import {BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Area} from "./Area";
import {Monster} from "../monster/Monster";

@Entity(`area_monsters`)
@Index((areaCell: AreaMonster) => [
	areaCell.areaId,
	areaCell.monsterMapId
], {
	unique: true
})
export class AreaMonster extends BaseEntity {

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

	@ManyToOne((type) => Area, (area: Area) => area.id, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE"
	})
	@JoinColumn()
	area!: Area

	@Column({
		nullable: false,
		unsigned: true,
		default: 1,
		unique: false
	})
	monsterId!: number

	@ManyToOne((type) => Monster, (monster: Monster) => monster.id, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE"
	})
	@JoinColumn()
	monster!: Monster

	@Column({
		type: `varchar`,
		nullable: false,
		default: `Enter`,
	})
	frame!: string

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	monsterMapId!: number

	@Column({
		type: 'boolean',
		nullable: false,
		unsigned: true,
		default: 0
	})
	isAggressive!: boolean;

}