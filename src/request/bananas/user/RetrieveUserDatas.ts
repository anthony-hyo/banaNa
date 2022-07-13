// noinspection SpellCheckingInspection
import {IRequest} from "../../../interfaces/IRequest";
import Player from "../../../avatar/Player/Player";
import RequestArg from "../../RequestArg";

export default class RetrieveUserDatas implements IRequest {

	name: string = `retrieveUserDatas`

	handler(player: Player, args: RequestArg): void {
		let initUserDatas: any = {
			cmd: `initUserDatas`,
			a: []
		}

		for (const id in args.list()) {
			const target: Player | undefined = player.room?.players().get(Number(id))

			if (target) {
				const userData: any = target.userData(false)
			}
		}
	}

}