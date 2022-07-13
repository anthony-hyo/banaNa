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

	@OneToOne((type) => Access, (access: Access) => access.id)
	@JoinColumn({
		name: `hairId`
	})
	access!: Access

	@Column({ nullable: false })
	gender!: `M` | `F`

	@OneToOne((type) => Hair, (hair: Hair) => hair.id)
	@JoinColumn({
		name: `hairId`
	})
	hair!: Hair

}