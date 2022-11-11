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
import {Hair} from "../hair/Hair";
import {Gender} from "../../../util/Const";
import {User} from "./User";
import {GameLevel} from "../game/GameLevel";

@Entity(`users_attribute`)
export class UserAttribute extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		nullable: false,
		unsigned: true
	})
	userId!: number

	@OneToOne((type) => User, (user: User) => user.attribute)
	@JoinColumn()
	user!: User

	@Column({
		nullable: false,
		unsigned: true,
		default: 0
	})
	coins!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 0
	})
	gold!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 1
	})
	levelId!: number

	@OneToOne((type) => GameLevel, (gameLevel: GameLevel) => gameLevel.level)
	@JoinColumn()
	level!: GameLevel

	@Column({
		nullable: false,
		unsigned: true,
		default: 5
	})
	activationFlag!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 0
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
		default: `1649e`
	})
	colorEye!: string

	@Column({
		type: `char`,
		length: 6,
		nullable: false,
		default: `5e4f37`
	})
	colorHair!: string

	@Column({
		type: `char`,
		length: 6,
		nullable: false,
		default: `eacd8a`
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
		default: `ffffff`
	})
	colorName!: string

	@Column({
		type: `char`,
		length: 6,
		nullable: false,
		default: `ffffff`
	})
	colorChat!: string

	@Column({
		nullable: false,
		unsigned: true,
		default: 1
	})
	damagePerSecond!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 1
	})
	range!: number

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