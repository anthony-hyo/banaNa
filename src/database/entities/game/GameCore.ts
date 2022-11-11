import {BaseEntity, Column, Entity, PrimaryGeneratedColumn,} from "typeorm"

@Entity(`game_core`)
export class GameCore extends BaseEntity {

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

	static async values(): Promise<any> {
		const values: any = {}

		const ass = await this.createQueryBuilder(`game_core`).getMany();

		for (let i = 0; i < ass.length; i++) {
			const core: GameCore = ass[i]
			values[core.name] = core.value
		}

		return values
	}

}