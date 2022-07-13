import Player from "../avatar/Player/Player";
import RequestArg from "./RequestArg";
import logger from "../util/Logger";
import {IRequest} from "../interfaces/IRequest";

export default class DefaultRequest implements IRequest {

	name: string = `default`

	handler(player: Player, args: RequestArg): void {
		logger.warn(`[DefaultRequest] default request called with args: ${args.toString()}`)
	}

}