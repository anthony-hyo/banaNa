import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn} from "typeorm";
import {Hair} from "../Hair";
import {BaseUserChild} from "./BaseUserChild";
import {Gender} from "../../../util/Const";

@Entity(`users_attributes`)
export class UserAttribute extends BaseUserChild {

	@Column({
		nullable: false,
		unsigned: true
	})
	coins!: number

	@Column({
		nullable: false,
		unsigned: true
	})
	gold!: number

	@Column({
		nullable: false,
		unsigned: true
	})
	level!: number

	@Column({
		nullable: false,
		unsigned: true
	})
	activationFlag!: number

	@Column({
		nullable: false,
		unsigned: true
	})
	permanentMuteFlag!: number

	@Column({
		type: "enum",
		enum: Gender,
		nullable: false,
		default: Gender.MALE
	})
	gender!: Gender

	@Column({
		nullable: false,
		unsigned: true
	})
	hairId!: number

	@OneToOne((type) => Hair)
	@JoinColumn()
	hair!: Hair

	@Column({
		type: `char`,
		length: 6,
		nullable: false,
		default: `000000`
	})
	colorAccessory!: string

	@Column({
		type: `char`,
		length: 6,
		nullable: false,
		default: `000000`
	})
	colorBase!: string

	@Column({
		type: `char`,
		length: 6,
		nullable: false,
		default: `000000`
	})
	colorEye!: string

	@Column({
		type: `char`,
		length: 6,
		nullable: false,
		default: `000000`
	})
	colorHair!: string

	@Column({
		type: `char`,
		length: 6,
		nullable: false,
		default: `000000`
	})
	colorSkin!: string

	@Column({
		type: `char`,
		length: 6,
		nullable: false,
		default: `000000`
	})
	colorTrim!: string

	@Column({
		type: `char`,
		length: 6,
		nullable: false,
		default: `000000`
	})
	colorName!: string

	@Column({
		type: `char`,
		length: 6,
		nullable: false,
		default: `000000`
	})
	colorChat!: string

	@Column({
		nullable: false
	})
	damagePerSecond!: number

	@Column({
		nullable: false
	})
	range!: number

	@Column({
		nullable: false
	})
	dexterity!: number

	@Column({
		nullable: false,
	})
	endurance!: number

	@Column({
		nullable: false
	})
	intelligence!: number

	@Column({
		nullable: false
	})
	luck!: number

	@Column({
		nullable: false
	})
	strength!: number

	@Column({
		nullable: false
	})
	wisdom!: number

	@UpdateDateColumn()
	updatedAt!: Date

	@CreateDateColumn()
	createdAt!: Date

}