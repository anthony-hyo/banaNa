export const DELIMITER: string = '\0';

export enum DecoderType {
	XML = `<`,
	JSON = `{`,
	XT = `%`,
	NONE = ``
}

export enum Gender {
	MALE = `M`,
	FEMALE = `F`
}

export enum Reputation {
	_1 = 0,
	_2 = 900,
	_3 = 3600,
	_4 = 10000,
	_5 = 22500,
	_6 = 44100,
	_7 = 78400,
	_8 = 129600,
	_9 = 202500,
	_10 = 302500
}