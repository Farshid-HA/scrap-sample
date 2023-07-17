import { Pool } from "pg"

export class DbConfig {

    static pool = new Pool({
        user: process.env.DB_USER ?? "postgres",
        password: process.env.DB_PASSWORD ?? "123",
        host: process.env.DB_SERVER ?? "db",
        port: Number(process.env.DB_PORT) ?? 5432,
        database: process.env.DB_NAME ?? "sreality_db"
    })

};

