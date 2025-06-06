import * as net from "net";
import {Server, Socket} from "net";
import logger from "../util/Logger";
import PlayerNetwork from "../avatar/Player/PlayerNetwork";

export default class Network {

	private readonly server: Server

	private count: number = 0

	constructor() {
		this.server = net.createServer();

		this.server.addListener('connection', (socket: Socket): void => {
			socket.setEncoding('utf-8');

			logger.warn(`[Network] new connection from: ${socket.remoteAddress}`)

			this.count++

			const playerNetwork: PlayerNetwork = new PlayerNetwork(this.count, socket);

			socket.on('data', (data: any): void => {
				playerNetwork.data(data)
			});

			socket.on('close', (): void => {
				logger.debug(`Disconnected`);
			});
		})

		this.server.listen({
			port: 5588,
			backlog: 10,
			exclusive: false
		}, () => logger.silly(`Server online`));
	}

}