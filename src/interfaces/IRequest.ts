import Player from "../avatar/Player/Player";
import RequestArg from "../request/RequestArg";

export interface IRequest {

	name: string

	handler(player: Player, args: RequestArg): void

}