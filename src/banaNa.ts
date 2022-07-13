import Network from "./network/Network";
import logger from "./util/Logger";
import Database from "./database/Database";
import GameController from "./controller/GameController";
import {GameCore} from "./database/entities/GameCore";
import {GameLogin} from "./database/entities/GameLogin";
import RoomController from "./controller/RoomController";

class banaNa {

	private readonly database: Database = new Database()

	public readonly gameController: GameController = new GameController()
	public readonly roomController: RoomController = new RoomController()

	constructor() {
		this.database
			.init()
			.then(async () => {
				logger.info(`[banaNa] database initialized.`)

				GameController.singleton.gameCore = await GameCore.values()
				GameController.singleton.gameLogin = await GameLogin.values()

				logger.info(`[banaNa] game initialized.`)

				new Network()

				logger.info(`[banaNa] network initialized.`)

				//TODO: something else..

				logger.info(`>>> >>> banaNa v1.0.0 started! <<< <<< <<< <<<`)
			})
	}

}

new banaNa()