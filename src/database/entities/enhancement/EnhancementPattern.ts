import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity(`enhancements_pattern`)
export class EnhancementPattern extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 1
	})
	dexterity!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 1
	})
	endurance!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 1
	})
	intelligence!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 1
	})
	luck!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 1
	})
	strength!: number

	@Column({
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