import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import {TypeEquipment} from "../type/TypeEquipment";
import {TypeFaction} from "../type/TypeFaction";
import {Reputation} from "../../../util/Const";
import {Quest} from "../quest/Quest";
import {Enhancement} from "../enhancement/Enhancement";
import {IItem} from "../../../util/interfaces/IItem";
import {GameLevel} from "../game/GameLevel";

@Entity(`items`)
export class Item extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		type: `varchar`,
		nullable: false,
		default: `Item`
	})
	name!: string

	@Column({
		type: `text`,
		nullable: false,
		default: `Basic description`
	})
	description!: string

	@Column({
		nullable: false,
		unsigned: true,
		default: 1
	})
	typeId!: number

	@ManyToOne((type) => TypeEquipment, (typeItem: TypeEquipment) => typeItem.id, {
		onDelete: "RESTRICT",
		onUpdate: "CASCADE"
	})
	@JoinColumn()
	type!: TypeEquipment

	@Column({
		type: `varchar`,
		length: `32`,
		nullable: false,
		default: `iibag`
	})
	icon!: string

	@Column({
		type: `varchar`,
		length: `32`,
		nullable: false,
		default: ``
	})
	file!: string

	@Column({
		type: `varchar`,
		length: `32`,
		nullable: false,
		default: ``
	})
	linkage!: string

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 0
	})
	cost!: number

	@Column({
		type: 'boolean',
		nullable: false,
		unsigned: true,
		default: 0
	})
	isCoins!: boolean;

	@Column({
		type: 'boolean',
		nullable: false,
		unsigned: true,
		default: 0
	})
	isTemporary!: boolean;

	@Column({
		type: 'boolean',
		nullable: false,
		unsigned: true,
		default: 0
	})
	isUpgradeOnly!: boolean;

	@Column({
		type: 'boolean',
		nullable: false,
		unsigned: true,
		default: 0
	})
	isStaffOnly!: boolean;

	@Column({
		type: 'boolean',
		nullable: false,
		unsigned: true,
		default: 0
	})
	isNotTrade!: boolean;

	@Column({
		type: 'boolean',
		nullable: false,
		unsigned: true,
		default: 0
	})
	isNotSellable!: boolean;

	@Column({
		name: `levelId`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	levelId!: number

	@ManyToOne((type) => GameLevel, (gameLevel: GameLevel) => gameLevel.id, {
		onDelete: "RESTRICT",
		onUpdate: "CASCADE"
	})
	@JoinColumn()
	level!: GameLevel

	@Column({
		nullable: false,
		unsigned: true,
		default: 0
	})
	enhancementId!: number

	@ManyToOne((type) => Enhancement, (enhancement: Enhancement) => enhancement.id, {
		onDelete: "RESTRICT",
		onUpdate: "CASCADE"
	})
	@JoinColumn()
	enhancement!: Enhancement

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	rarity!: number

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	range!: number

	@Column({
		type: `int`,
		nullable: false,
		unsigned: true,
		default: 1
	})
	stack!: number

	@Column({
		type: `int`,
		nullable: false,
		default: -1
	})
	questStringIndex!: number;

	@Column({
		type: `int`,
		nullable: false,
		default: -1
	})
	questStringValue!: number;

	async questStringName(): Promise<string> {
		const quests: Quest[] = await Quest.findBy({
			chainId: this.questStringIndex,
			chainValue: this.questStringValue,
		})

		let s: string = ``

		quests.forEach((quest: Quest) => s += `,${quest.name}`)

		return s.substring(1)
	}

	/**
	 * Required class item
	 */
	@Column({
		nullable: true,
		unsigned: true,
		default: null
	})
	requiredClassItemId!: number

	@ManyToOne((type) => Item, (item: Item) => item.id, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE"
	})
	@JoinColumn()
	requiredClassItem!: Item

	@Column({
		type: "enum",
		enum: Reputation,
		nullable: false,
		default: Reputation._1
	})
	requiredClassPoint!: Reputation

	/**
	 * Required faction
	 */
	@Column({
		nullable: true,
		unsigned: true,
		default: null
	})
	requiredFactionId!: number

	@ManyToOne((type) => TypeFaction, (typeFaction: TypeFaction) => typeFaction.id, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE"
	})
	@JoinColumn()
	requiredFaction!: TypeFaction

	@Column({
		type: "enum",
		enum: Reputation,
		nullable: false,
		default: Reputation._1
	})
	requiredFactionReputation!: Reputation

	@Column({
		type: `varchar`,
		length: `32`,
		nullable: false,
		default: ``
	})
	meta!: string

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

	async properties(includeEnhance: boolean): Promise<IItem> {
		let data: IItem = {
			ItemID: this.id,
			bCoins: this.isCoins ? 1 : 0,
			bHouse: this.type.isHouseItem ? 1 : 0,
			bPTR: 0,
			bStaff: this.isStaffOnly ? 1 : 0,
			bTemp: this.isTemporary ? 1 : 0,
			bUpg: this.isUpgradeOnly ? 1 : 0,
			bTrade: this.isNotTrade ? 0 : 1,
			bSellable: this.isNotSellable ? 0 : 1,
			iCost: this.cost,
			iDPS: 10,
			iLvl: this.levelId,
			iRng: this.range,
			iRty: this.rarity,
			iStk: this.stack,
			iQSindex: this.questStringIndex,
			iQSvalue: this.questStringValue,
			sQuest: await this.questStringName(),
			sDesc: this.description,
			sES: this.type.equipment,
			sElmt: "None",
			sFile: this.file,
			sIcon: this.icon,
			sLink: this.linkage,
			sName: this.name,
			iReqCP: this.requiredClassPoint,
			iClass: this.requiredClassItemId,
			sClass: this.requiredClassItem.name,
			iReqRep: this.requiredFactionReputation,
			FactionID: this.requiredFactionId,
			sFaction: this.requiredFaction.name,
			sReqQuests: "",
			sType: this.type.name,
			sMeta: this.meta
		}

		if (this.enhancementId > 0 && includeEnhance) {
			if (this.type.name === `Enhancement`) {
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
					iRng: this.range,
					EnhRng: this.range,
					InvEnhPatternID: this.enhancement.patternId,
					EnhDPS: this.enhancement.damagePerSecond
				})
			}
		}

		return data;
	}

}