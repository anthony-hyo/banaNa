import {DataSource} from "typeorm";

export default class Database {

	private readonly database: DataSource

	constructor() {
		this.database = new DataSource({
			type: "mariadb",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "123",
			database: "banana",
			synchronize: true,
			entityPrefix: `bn_`,
			entities: [
				`${__dirname}/entities/**/*.ts`
			],
		})
	}

	public async init(): Promise<void> {
		await this.database.initialize()
	}

}