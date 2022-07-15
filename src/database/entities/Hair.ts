import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,} from "typeorm"
import {Gender} from "../../util/Const";

@Entity(`hairs`)
export class Hair extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		nullable: false
	})
	name!: string

	@Column({
		nullable: false
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