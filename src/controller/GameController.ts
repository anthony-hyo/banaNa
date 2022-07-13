export default class GameController {

	public static singleton: GameController

	public gameCore: any = {}
	public gameLogin: string = ``

	constructor() {
		GameController.singleton = this
	}

}