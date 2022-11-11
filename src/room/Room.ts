import {Area} from "../database/entities/area/Area";
import Player from "../avatar/Player/Player";

export default class Room {

	private readonly _databaseId: number
	private readonly _id: number

	private readonly _players: Map<number, Player> = new Map<number, Player>()

	constructor(id: number, databaseId: number) {
		this._id = id
		this._databaseId = databaseId;
	}

	public get databaseId(): number {
		return this._databaseId;
	}

	public get id(): number {
		return this._id;
	}

	public data(): Promise<Area | null> {
		return Area.findOneBy({
			id: this._databaseId
		})
	}

	public addPlayer(player: Player) {
		this._players.set(player.network.id, player)
		player.room = this
	}

	public removePlayer(player: Player) {
		this._players.delete(player.network.id)
	}

	public players(): Map<number, Player> {
		return this._players
	}

	public write(data: string): void {
		this._players.forEach((player: Player) => player.network.write(data))
	}

	public writeObject(data: object): void {
		this._players.forEach((player: Player) => player.network.writeObject(data))
	}

	public writeString(...data: any[]): void {
		this._players.forEach((player: Player) => player.network.writeString(data))
	}

	public writeExcept(player: Player, data: string): void {
		this._players.forEach((target: Player) => {
			if (player.network.id !== target.network.id) {
				target.network.write(data)
			}
		})
	}

	public writeObjectExcept(player: Player, data: object): void {
		this._players.forEach((target: Player) => {
			if (player.network.id !== target.network.id) {
				target.network.writeObject(data)
			}
		})
	}

	public writeStringExcept(player: Player, ...data: any[]): void {
		this._players.forEach((target: Player) => {
			if (player.network.id !== target.network.id) {
				target.network.writeString(data)
			}
		})
	}

}