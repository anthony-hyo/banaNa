import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,} from "typeorm"

@Entity(`hairs`)
export class Hair extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number

	@Column({ nullable: false })
	name!: string

	@Column({ nullable: false })
	file!: string

	@Column({ nullable: false })
	gender!: `M` | `F`

}