import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,} from "typeorm"

@Entity(`game_login`)
export class GameLogin extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true,
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
	value!: string

	static async values(): Promise<string> {
		let values = ``

		const ass = await this.createQueryBuilder(`game_login`).getMany();

		for (let i = 0; i < ass.length; i++) {
			const core: GameLogin = ass[i]
			values += `,${core.name}=${core.value}`
		}

		return values.substring(1)
	}

}