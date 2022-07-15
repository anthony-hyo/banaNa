import {DataSource} from "typeorm";

export default class Database {

	private readonly database: DataSource

	constructor() {
		this.database = new DataSource({
			type: `mariadb`,
			charset: `utf8mb4_general_ci`,
			timezone: `Z`,
			name: `banaNa`,
			entities: [
				`${__dirname}/entities/**/*.ts`
			],
			entityPrefix: `bn_`,
			synchronize: true,
			relationLoadStrategy: `query`,
			cache: {
				duration: 30000
			},
			host: `localhost`,
			port: 3306,
			username: "root",
			password: "123",
			database: "banana",
		})
	}

	public async init(): Promise<void> {
		await this.database.initialize()
	}

}