import Avatar from "../Avatar";
import {User} from "../../database/entities/User";
import PlayerNetwork from "./PlayerNetwork";
import Room from "../../room/Room";
import RoomController from "../../controller/RoomController";

export default class Player extends Avatar {

	private readonly _databaseId: number
	private readonly _username: string

	private readonly _network: PlayerNetwork

	constructor(user: User, playerNetwork: PlayerNetwork) {
		super();
		this._databaseId = user.id;
		this._username = user.username;
		this._network = playerNetwork;
	}

	private _room: Room | undefined

	public get room(): Room | undefined {
		return this._room;
	}

	public set room(value: Room | undefined) {
		this._room = value;
	}

	public get databaseId(): number {
		return this._databaseId;
	}

	public get username(): string {
		return this._username;
	}

	public get network(): PlayerNetwork {
		return this._network;
	}

	public get data(): Promise<User | null> {
		return User.findOneBy({
			id: this._databaseId
		})
	}

	public get properties(): any {
		return {
			afk: false,
			entID: this._network.id,
			entType: "p",
			intHP: 2067,
			intHPMax: 2077,
			intLevel: 56,
			intMP: 100,
			intMPMax: 100,
			intState: 1,
			showCloak: true,
			showHelm: true,
			strFrame: "Enter",
			strPad: "Spawn",
			strUsername: this._username,
			ty: 0,
			tx: 0,
			uoName: this._username,
		}
	}

	public join(room: Room): void {
		//TODO: join checks (staff, upgrade, level..)

		//TODO: move to cell except current player
		RoomController.singleton.join(this, room)

		let moveToArea: any = {
			cmd: "moveToArea",
			areaId: room.id,
			areaName: "outset-1",
			areaCap: 999,
			sExtra: "",
			strMapFileName: "event/redhero-outset-alter-16.10.2021.r15.swf",
			strMapName: "outset",
			uoBranch: [],
			monBranch: [],
			intType: 2
		}

		room.players().forEach((target: Player) => moveToArea.uoBranch.push(target.properties))

		this.network.writeObject(moveToArea)
	}

	public async userData(guild: boolean) {
		const data: User = <User> await this.data

		return {
			eqp: [
				{
					ItemID: 1,
					sFile: `aldargentrita.swf`,
					sLink: `AldArgentRita`,
				}
			],
			iCP: 9999,
			iUpgDays: 99,
			intAccessLevel: data.access,
			intColorAccessory: data.colorAccessory,
			intColorBase: data.colorBase,
			intColorEye: data.colorEye,
			intColorHair: data.colorHair,
			intColorSkin: data.colorSkin,
			intColorTrim: data.colorTrim,
			intColorName: data.colorName,
			strChatColor: data.colorChat,
			intLevel: data.level,
			strClassName: `Test class`,
			strGender: data.gender,
			strHairFilename: data.hair.file,
			strHairName: data.hair.name,
			strUsername: this._username,
		}
	}
}