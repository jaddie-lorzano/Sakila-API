import db from '../config/db.js';
import {} from 'dotenv/config'

let databaseName = process.env.DB_NAME;

let baseRepo = {
    get: async (tableName, dbTableColumnList, dbValuesList) => {

        if (dbTableColumnList == undefined) dbTableColumnList = [];
        if (dbValuesList == undefined) dbValuesList = [];

        let sql = `SELECT * FROM ${databaseName}.${tableName}`;
        console.log(dbTableColumnList.join(' LIKE ? AND '));
        if (dbTableColumnList.length > 0 && dbValuesList.length > 0) {
            sql += ` WHERE ${dbTableColumnList.join(' LIKE ? AND ')} LIKE ?`
        }

        let insert = dbValuesList;
        console.log(`db.execute(${sql}, ${insert})`)
        let [entities, _] = await db.execute(sql, insert);
        return entities;
    },

    getById: async (id, tableName) => {
        let sql = `SELECT * FROM ${databaseName}.${tableName} WHERE ${tableName}_id = ?`;
        let insert = [id];
        let [[entity], _] = await db.execute(sql, insert);
        return entity;
    },
    insert: async (tableName, dbTableColumnList, dbValuesList) => {
        let sql = 
        `INSERT INTO ${databaseName}.${tableName} (${dbTableColumnList}) VALUES(?,?,?)`;
        let insert = dbValuesList;
        let [entity, ] = await db.execute(sql, insert);
        return entity.insertId;
    },
    update: async (first_name, last_name, last_updated) => {

    },
    delete: async (id) => {

    }
}

export default baseRepo;