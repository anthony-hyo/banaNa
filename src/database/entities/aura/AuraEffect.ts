import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Aura} from "./Aura";

@Entity(`auras_effects`)
export class Area extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		nullable: false,
		unsigned: true,
		default: 1
	})
	auraId!: number

	@ManyToOne((type) => Aura, (aura: Aura) => aura.id)
	@JoinColumn()
	aura!: Aura

}