import { DbConfig } from "../config/dbConfig";

function initDb() {
    try {
        createTable();
    } catch (err) {
        console.log(err);
    }
}

function createTable() {
    const createTblQry = `CREATE TABLE IF NOT EXISTS offer(
    id serial PRIMARY KEY,
    title varchar (250) ,
    price varchar (50) ,
    imgSrc varchar(500),
    link varchar(500),
    description varchar(500)
    )`;

    DbConfig.pool.query(createTblQry).then((response: any) => {
        console.log("table Created");
        console.log(response);
    })
}
export default {
    initDb
};