import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,} from "typeorm"

@Entity(`access`)
export class Access extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number

	@Column({ nullable: false })
	name!: string

}