import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity(`game_level`)
export class GameLevel extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true,
	})
	level!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 302500
	})
	requiredExperience!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 302500
	})
	health!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 302500
	})
	mana!: number

}