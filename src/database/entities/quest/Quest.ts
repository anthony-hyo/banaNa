import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity(`quests`)
export class Quest extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		type: `varchar`,
		nullable: false,
		default: `Quest`
	})
	name!: string

	@Column({
		type: `int`,
		nullable: true,
		default: null
	})
	chainId!: number;

	@Column({
		type: `int`,
		nullable: false,
		default: -1
	})
	chainValue!: number;

}