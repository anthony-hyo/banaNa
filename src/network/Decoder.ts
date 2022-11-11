import PlayerNetwork from "../avatar/Player/PlayerNetwork";
import {XMLParser} from "fast-xml-parser";
import {User} from "../database/entities/user/User";
import {IRequest} from "../interfaces/IRequest";
import RequestArg from "../request/RequestArg";
import Player from "../avatar/Player/Player";
import GameController from "../controller/GameController";
import {DecoderType} from "../util/Const";

export default class Decoder {

	private readonly playerNetwork: PlayerNetwork

	private readonly xmlParser: XMLParser = new XMLParser({
		ignoreAttributes : false,
		attributeNamePrefix : "_"
	})

	constructor(playerNetwork: PlayerNetwork) {
		this.playerNetwork = playerNetwork;
	}

	public decode(data: string): void {
		const first: string = data.charAt(0)

		switch (first) {
			case DecoderType.XML:
				if (data.includes(`policy`)) {
					this.playerNetwork.write(`<cross-domain-policy><allow-access-from domain='*' to-ports='5588' /></cross-domain-policy>`)
					return
				}

				const dataXML: any = this.xmlParser.parse(data)

				switch (dataXML.msg.body._action) {
					case 'verChk':
						// noinspection HtmlUnknownAttribute
						this.playerNetwork.write(`<msg t='sys'><body action='${dataXML.msg.body.ver._v >= 157 ? `apiOK` : `apiKO`}' r='0'></body></msg>`)
						break
					case 'login':
						const username: string = dataXML.msg.body.login.nick.split(`~`)[1]
						const token: string = dataXML.msg.body.login.pword

						User
							.findOneBy({
								username: username,
								//token: token
							})
							.then((user: User | null) => {
								if (user) {
									this.playerNetwork.player = new Player(user, this.playerNetwork)
									//TODO: Message of the day
									this.playerNetwork.writeString(`loginResponse`, `true`, user.id, user.username, `Message of the day`, `2017-09-30T10:58:57`, GameController.singleton.gameLogin)
								} else {
									this.playerNetwork.writeString(`loginResponse`, `false`, `-1`, username, `User Data for '${username}' could not be retrieved. Please contact the development staff to resolve the issue.`)
								}
							})
						break
					default:
						//TODO: Kick or Ban
						break
				}
				break
			case DecoderType.JSON:
				break
			case DecoderType.XT:
				if (!this.playerNetwork.player) {
					//TODO: Kick or Ban
					return;
				}

				const dataBody: number = data.indexOf('%', 1)

				const body: string = data.substring(dataBody + 1);
				const params: string[] = body.split("%")

				const args: string[] = []

				for (let i = 3; i < params.length; i++) {
					args.push(params[i])
				}

				const request: IRequest = this.playerNetwork.request.getRequest(params[1])

				request.handler(this.playerNetwork.player, RequestArg.parse(args))
				break
			default:
			case DecoderType.NONE:
				//TODO: Kick or Ban
				break
		}
	}

}