import {IRequest} from "../../interfaces/IRequest";
import Player from "../../avatar/Player/Player";
import RequestArg from "../RequestArg";
import RoomController from "../../controller/RoomController";
import Room from "../../room/Room";
import GameController from "../../controller/GameController";

export default class FirstJoin implements IRequest {

	name: string = `firstJoin`

	handler(player: Player, args: RequestArg): void {
		player.network.writeObject({
			cmd: `cvu`,
			o: GameController.singleton.gameCore
		})

		const room: Room = RoomController.find(`battleon`)

		player.join(room)
	}

}