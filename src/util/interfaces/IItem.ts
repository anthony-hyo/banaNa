import {Reputation} from "../Const";

export interface IItem {
	iClass: number
	bPTR: number
	iQSvalue: number
	sQuest: string
	bUpg: number
	iLvl: number
	iDPS: number
	sDesc: string
	sElmt: string
	bTemp: number
	bSellable: number
	bStaff: number
	bCoins: number
	sES: string
	sMeta: string
	sFaction: string
	sClass: string
	sReqQuests: string
	sName: string
	FactionID: number
	ItemID: number
	bTrade: number
	iStk: number
	iCost: number
	sType: string
	iRng: number
	sLink: string
	iQSindex: number
	iReqRep: Reputation
	sFile: string
	bHouse: number
	sIcon: string
	iReqCP: Reputation
	iRty: number
}