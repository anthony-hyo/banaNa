import {IRequest} from "../../../interfaces/IRequest";
import Player from "../../../avatar/Player/Player";
import RequestArg from "../../RequestArg";
import {User} from "../../../database/entities/user/User";
import {UserAttribute} from "../../../database/entities/user/UserAttribute";

export default class RetrieveUserDatas implements IRequest {

	name: string = `retrieveUserDatas`

	async handler(player: Player, args: RequestArg): Promise<void> {
		const initUserDatas: {
			cmd: string
			a: {
				uid: number
				strFrame: string
				strPad: string
				data: any
			}[]
		} = {
			cmd: `initUserDatas`,
			a: []
		}

		for (const id in args.list()) {
			if (isNaN(parseInt(id)) || !player.room) {
				continue
			}

			const target: Player | undefined = player.room.players().get(Number(id))

			if (!target) {
				continue
			}

			const userData: User = <User> await User.findOne({
				where: {
					id: target.databaseId
				},
				relations: {
					attribute: {
						hair: true
					}
				}
			})

			const data: any = userData.properties

			if (target.databaseId === player.databaseId) {
				Object.assign(data, RetrieveUserDatas.self(target, userData))
			}

			initUserDatas.a.push({
				uid: target.network.id,
				strFrame: 'Enter', //TODO: current frame
				strPad: 'Spawn', //TODO: current pad
				data: data
			})

			player.network.writeObject(initUserDatas)
		}
	}

	private static self(player: Player, data: User): any {
		const attribute: UserAttribute = data.attribute

		return {
			CharID: data.id,
			HairID: attribute.hairId,
			UserID: player.network.id,
			bPermaMute: attribute.permanentMuteFlag,
			bitSuccess: true,
			dCreated: `2017-09-30T10:58:57`,
			dUpgExp: `2017-09-30T10:58:57`,
			iAge: 69,
			iBagSlots: 99, //TODO: attr. bag slot
			iBankSlots: 99, //TODO: attr. bank slot
			iHouseSlots: 99, //TODO: attr. bank slot
			iBoostCP: 0,
			iBoostG: 0,
			iBoostRep: 0,
			iBoostXP: 0,
			iDBCP: 0,
			iDEX: 0,
			iDailyAdCap: 6,
			iDailyAds: 0,
			iEND: 0,
			iFounder: 0,
			iINT: 0,
			iLCK: 0,
			iSTR: 0,
			iUpg: true, //TODO: check if is upgrade
			iWIS: 0,
			intActivationFlag: attribute.activationFlag,
			intCoins: attribute.coins,
			intDBGold: attribute.gold,
			intGold: attribute.gold,
			intDBExp: 0, //TODO: attr. experience
			intExp: 0, //TODO: attr. experience
			intExpToLevel: 5, //TODO: game levels
			intHP: 6969, //TODO: ??
			intHPMax: 6969, //TODO: ??
			intHits: 0,
			intMP: 1111, //TODO: ??
			intMPMax: 1111, //TODO: ??
			lastArea: "",
			sCountry: `CH`, //TODO: country
			sHouseInfo: ``, //TODO: attr. house
			strEmail: data.email,
			strMapName: `battleon`, //TODO: ??
			strQuests: `000000000000000000000000000000000000000000000000000000000000000000000000000000`, //TODO: attr. quests
			strQuests2: `000000000000000000000000000000000000000000000000000000000000000000000000000000`, //TODO: attr. quests
			strQuests3: `000000000000000000000000000000000000000000000000000000000000000000000000000000`, //TODO: attr. quests
			strQuests4: `000000000000000000000000000000000000000000000000000000000000000000000000000000`, //TODO: attr. quests
		}
	}

}