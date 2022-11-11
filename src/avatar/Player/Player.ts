import Avatar from "../Avatar";
import {User} from "../../database/entities/user/User";
import PlayerNetwork from "./PlayerNetwork";
import Room from "../../room/Room";
import RoomController from "../../controller/RoomController";
import PlayerInventory from "./PlayerInventory";

export default class Player extends Avatar {

	private readonly _databaseId: number
	private readonly _username: string

	private readonly _network: PlayerNetwork

	private readonly _inventory: PlayerInventory = new PlayerInventory(this)

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

	public get inventory(): PlayerInventory {
		return this._inventory;
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

}