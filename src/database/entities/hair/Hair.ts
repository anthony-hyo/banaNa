import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,} from "typeorm"
import {Gender} from "../../../util/Const";

@Entity(`hairs`)
export class Hair extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		type: `text`,
		nullable: false,
		default: ``
	})
	name!: string

	@Column({
		type: `text`,
		nullable: false,
		default: ``
	})
	file!: string

	@Column({
		type: "enum",
		enum: Gender,
		nullable: false,
		default: Gender.MALE
	})
	gender!: Gender

}