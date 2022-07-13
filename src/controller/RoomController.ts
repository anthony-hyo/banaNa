import {IRequest} from "../interfaces/IRequest";
import Room from "../room/Room";
import Player from "../avatar/Player/Player";
import Helper from "../util/Helper";

export default class RoomController {

	public static singleton: RoomController

	private readonly rooms: Map<number, Room> = new Map<number, Room>()

	constructor() {
		RoomController.singleton = this
	}

	public static find(name: string): Room {
		return new Room(99, 88)
	}

	public join(player: Player, room: Room) {
		if (player.room) {
			// noinspection HtmlUnknownAttribute
			player.room.writeExcept(player, `<msg t='sys'><body action='userGone' r='${room.id}'><user id='${player.network.id}' /></body></msg>`)
			player.room.writeStringExcept(player, "exitArea", player.network.id, player.network)
			player.room.removePlayer(player)
			//TODO: remove room if room coutn <= 0
		}

		room.addPlayer(player)

		room.writeObjectExcept(player, {
			cmd: `uotls`,
			o: player.properties,
			unm: player.username
		})

		let response: string = Helper.joinOK(room.id)

		let i: number = 1

		room.players().forEach((target: Player) => {
			// noinspection HtmlUnknownAttribute
			response += `<u i='${target.network.id}' m='0' s='0' p='${i}'><n><![CDATA[${target.username}]]></n><vars></vars></u>`
			i++
		})

		response += `</uLs></body></msg>`

		player.network.write(response)

		//TODO: send to room except player -> `<msg t='sys'><body action='uER' r='${room.id}'><u i ='${player.network.id}' m='0'><n><![CDATA[${room.name}]]></n><vars></vars></u></body></msg>`
	}

}