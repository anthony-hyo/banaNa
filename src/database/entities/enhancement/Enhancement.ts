import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import {EnhancementPattern} from "./EnhancementPattern";
import {GameLevel} from "../game/GameLevel";

@Entity(`enhancements`)
export class Enhancement extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	patternId!: number

	@OneToOne((type) => EnhancementPattern, (enhancementPattern: EnhancementPattern) => enhancementPattern.id)
	@JoinColumn()
	pattern!: EnhancementPattern

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	levelId!: number

	@OneToOne((type) => GameLevel, (gameLevel: GameLevel) => gameLevel.level)
	@JoinColumn()
	level!: GameLevel

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	damagePerSecond!: number

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	rarity!: number

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

}