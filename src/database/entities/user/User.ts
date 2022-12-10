import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm"
import {TypeAccess} from "../type/TypeAccess";
import {UserAttribute} from "./UserAttribute";
import {Gender} from "../../../util/Const";
import {UserInventory} from "./UserInventory";

@Entity(`users`)
@Index((user: User) => [
	user.username, user.password
], {
	unique: true
})
@Index((user: User) => [
	user.username, user.token
], {
	unique: true
})
export class User extends BaseEntity {

	@PrimaryGeneratedColumn({
		unsigned: true
	})
	id!: number

	@Column({
		type: `varchar`,
		length: `32`,
		nullable: false,
		readonly: true,
		unique: true,
	})
	username!: string

	@Column({
		nullable: false,
		readonly: true,
		unique: true
	})
	password!: string

	@Column({
		nullable: false
	})
	token!: string

	@Column({
		nullable: false
	})
	email!: string

	@Column({
		nullable: false,
		unsigned: true
	})
	accessId!: number

	@ManyToOne((type) => TypeAccess, {
		onDelete: "RESTRICT",
		onUpdate: "CASCADE"
	})
	@JoinColumn()
	access!: TypeAccess

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date

	@OneToOne((type) => UserAttribute, (userAttribute: UserAttribute) => userAttribute.user)
	attribute!: UserAttribute

	@OneToMany((type) => UserInventory, (userInventory: UserInventory) => userInventory.user)
	inventory!: UserInventory[]

	get properties(): { intAccessLevel: TypeAccess; intColorBase: string; intColorEye: string; strChatColor: string; eqp: ({ ar: { sLink: string; sFile: string; ItemID: number } } | { Weapon: { sType: string; sLink: string; sFile: string; ItemID: number } })[]; strGender: Gender; strUsername: string; intColorAccessory: string; intLevel: number; iUpgDays: 99; strClassName: "Test class"; intColorHair: string; strHairFilename: string; intColorName: string; iCP: 9999; strHairName: string; intColorTrim: string; intColorSkin: string } {
		const attribute: UserAttribute = this.attribute

		return {
			eqp: [
				{
					ar: {
						ItemID: 1,
						sFile: `aldargentrita.swf`,
						sLink: `AldArgentRita`,
					}
				},
				{
					Weapon: {
						ItemID: 1,
						sFile: `items/swords/default.swf`,
						sLink: ``,
						sType: 'Sword'
					}
				}
			],
			iCP: 9999,
			iUpgDays: 99,
			intAccessLevel: this.access,
			intColorAccessory: attribute.colorAccessory,
			intColorBase: attribute.colorBase,
			intColorEye: attribute.colorEye,
			intColorHair: attribute.colorHair,
			intColorSkin: attribute.colorSkin,
			intColorTrim: attribute.colorTrim,
			intColorName: attribute.colorName,
			strChatColor: attribute.colorChat,
			intLevel: attribute.levelId,
			strClassName: `Test class`,
			strGender: attribute.gender,
			strHairFilename: attribute.hair.file,
			strHairName: attribute.hair.name,
			strUsername: this.username,
		}
	}

}