import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,} from "typeorm"
import {Hair} from "./Hair";
import {Access} from "./Access";

@Entity(`users`)
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number

	@Column({ nullable: false })
	username!: string

	@Column({ nullable: false })
	password!: string

	@Column({ nullable: false })
	token!: string

	@OneToOne((type) => Access, (access: Access) => access.id/*, {
		nullable: false
	}*/)
	@JoinColumn({
		name: `accessId`
	})
	access!: Access

	@Column({ nullable: false })
	level!: number;

	@Column({ nullable: false })
	gender!: `M` | `F`

	@OneToOne((type) => Hair, (hair: Hair) => hair.id/*, {
		nullable: false
	}*/)
	@JoinColumn({
		name: `hairId`
	})
	hair!: Hair

	@Column({ nullable: false })
	colorAccessory!: number

	@Column({ nullable: false })
	colorBase!: number

	@Column({ nullable: false })
	colorEye!: number

	@Column({ nullable: false })
	colorHair!: number

	@Column({ nullable: false })
	colorSkin!: number

	@Column({ nullable: false })
	colorTrim!: number

	@Column({ nullable: false })
	colorName!: number;

	@Column({ nullable: false })
	colorChat!: number

}