import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import {Item} from "../item/Item";
import {Enhancement} from "../enhancement/Enhancement";
import {User} from "./User";
import {IItem} from "../../../util/interfaces/IItem";
import Helper from "../../../util/Helper";

@Entity(`users_inventory`)
export class UserInventory extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		nullable: false,
		unsigned: true
	})
	userId!: number

	@ManyToOne((type) => User, (user: User) => user.inventory)
	@JoinColumn()
	user!: User

	@Column({
		nullable: false,
		unsigned: true
	})
	itemId!: number

	@ManyToOne((type) => Item, (item: Item) => item.id)
	@JoinColumn()
	item!: Item

	@Column({
		nullable: false,
		unsigned: true,
		default: 0
	})
	enhancementId!: number

	@ManyToOne((type) => Enhancement, (enhancement: Enhancement) => enhancement.id)
	@JoinColumn()
	enhancement!: Enhancement

	@Column({
		type: 'boolean',
		nullable: false,
		unsigned: true
	})
	isEquipped!: boolean

	@Column({
		type: 'boolean',
		nullable: false,
		unsigned: true
	})
	isOnBank!: boolean

	@Column({
		type: 'boolean',
		nullable: false,
		unsigned: true
	})
	isAvailable!: boolean

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

	@DeleteDateColumn()
	deletedDate!: Date

	private quantity: any;

	async properties(): Promise<IItem> {
		let data: IItem = await this.item.properties(false)

		Object.assign(data, {
			bBank: 0,
			CharItemID: this.id,
			iQty: this.quantity,
			iHrs: (new Date().getTime() - this.createdAt.getTime()) / 3600000,
			dPurchase: Helper.formatDate(this.createdAt)
		})

		if (this.enhancementId > 0) {
			if (this.item.type.name === `Enhancement`) {
				Object.assign(data, {
					PatternID: this.enhancement.patternId,
					iDPS: this.enhancement.damagePerSecond,
					iLvl: this.enhancement.levelId,
					EnhID: 0,
				})

				//delete data.sFile
			} else {
				Object.assign(data, {
					EnhID: this.enhancement.id,
					EnhLvl: this.enhancement.levelId,
					EnhPatternID: this.enhancement.patternId,
					EnhRty: this.enhancement.rarity,
					iRng: this.item.range,
					EnhRng: this.item.range,
					InvEnhPatternID: this.enhancement.patternId,
					EnhDPS: this.enhancement.damagePerSecond
				})
			}
		}

		if (this.isEquipped) {
			Object.assign(data, {
				bEquip: "1",
				EnhLvl: this.enhancement.levelId,
				EnhPatternID: this.enhancement.patternId,
				EnhRty: this.enhancement.rarity,
				iRng: this.item.range,
				EnhRng: this.item.range,
				InvEnhPatternID: this.enhancement.patternId,
				EnhDPS: this.enhancement.damagePerSecond
			})
		}

		return data;
	}

}