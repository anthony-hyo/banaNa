import {IRequest} from "../../../interfaces/IRequest";
import Player from "../../../avatar/Player/Player";
import RequestArg from "../../RequestArg";
import {User} from "../../../database/entities/user/User";
import {UserInventory} from "../../../database/entities/user/UserInventory";
import {IItem} from "../../../util/interfaces/IItem";

export default class RetrieveInventory implements IRequest {

	name: string = `retrieveInventory`

	async handler(player: Player, args: RequestArg): Promise<void> {
		const userData: User = <User> await User.findOne({
			where: {
				id: player.databaseId
			},
			relations: {
				inventory: {
					item: {
						type: true
					},
					enhancement: true
				}
			}
		})

		const inventory: UserInventory[] = userData.inventory.filter((userInventory: UserInventory) => !userInventory.isOnBank && userInventory.isAvailable)
		const bank: UserInventory[] = userData.inventory.filter((userInventory: UserInventory) => userInventory.isOnBank && userInventory.isAvailable)

		const items: IItem[] = []
		const house: IItem[] = []

		for await (const userInventory of inventory) {
			const item: IItem = await userInventory.properties()

			if (userInventory.item.type.isHouseItem) {
				house.push(item)
			} else {
				items.push(item)
			}
		}

		// noinspection SpellCheckingInspection
		player.network.writeObject({
			cmd: 'loadInventoryBig',
			bankCount: bank.length,
			items: items,
			hitems: house,
			titems: [],
			factions: []
		})
	}

}