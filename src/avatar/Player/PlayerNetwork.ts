import Player from "./Player";
import {Socket} from "net";
import logger from "../../util/Logger";
import Request from "../../request/Request";
import Decoder from "../../network/Decoder";
import {DELIMITER} from "../../util/Const";

export default class PlayerNetwork {

	public readonly request: Request = new Request(this)
	public readonly decoder: Decoder = new Decoder(this)

	public player: Player | undefined

	private chunk: string = "";

	private readonly socket: Socket;
	private readonly _id: number;

	constructor(count: number, socket: Socket) {
		this._id = count
		this.socket = socket;
	}

	public get id(): number {
		return this._id;
	}

	public data(data: any): void {
		this.chunk += data.toString();

		let d_index = this.chunk.indexOf(DELIMITER);

		while (d_index > -1) {
			try {
				const string: string = this.chunk.substring(0, d_index);

				logger.debug(`[PlayerNetwork] received ${string}`)

				this.decoder.decode(string)
			} catch (error) {
				logger.error(`[PlayerNetwork] received error ${error}`)
			}

			this.chunk = this.chunk.substring(d_index + DELIMITER.length)

			d_index = this.chunk.indexOf(DELIMITER)
		}
	}

	public write(data: string): void {
		logger.debug(`[PlayerNetwork] sending ${data}`)
		this.socket.write(data + DELIMITER)
	}

	public writeObject(data: object): void {
		this.write(JSON.stringify({
			t: `xt`,
			b: {
				r: -1,
				o: data
			},
		}))
	}

	public writeString(...data: any[]): void {
		let response: string = ``

		for (let i: number = 1; i < data.length; ++i) {
			response += `${data[i]}%`
		}

		this.write(`%xt%${data[0]}%-1%${response}`)
	}

}

