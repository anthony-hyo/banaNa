import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity(`game_level`)
export class GameLevel extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true,
	})
	id!: number

	@Column({
		nullable: false,
		type: `int`,
		unsigned: true,
		default: 302500
	})
	requiredExperience!: number

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 302500
	})
	health!: number

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 100
	})
	mana!: number

}