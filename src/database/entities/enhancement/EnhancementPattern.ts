import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity(`enhancements_pattern`)
export class EnhancementPattern extends BaseEntity {

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
	dexterity!: number

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	endurance!: number

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	intelligence!: number

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	luck!: number

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	strength!: number

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	wisdom!: number

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

}