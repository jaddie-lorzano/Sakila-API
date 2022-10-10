import db from '../config/db.js';

let databaseName = `sakila`

let baseRepo = {
    get: async (tableName) => {
        let sql = `SELECT * FROM ${databaseName}.${tableName}`;
        let [entities, ] = await db.execute(sql);
        return entities;
    },

    getById: async (id, tableName) => {
        let sql = `SELECT * FROM ${databaseName}.${tableName} WHERE ${tableName}_id = ?`;
        let insert = [id];
        let [[entity], _] = await db.execute(sql, insert);
        return entity;
    },
    insert: async (columns, values, tableName) => {
        let sql = 
        `INSERT INTO ${databaseName}.${tableName} (${columns}) VALUES(?,?,?)`;
        let [entity, ] = await db.execute(sql, values);
        return entity.insertId;
    },
    filter: async (tableArray, valuesArray, tableName) => {
        let sql = 
        `
            SELECT * 
            FROM ${databaseName}.${tableName}
            WHERE ${tableArray.join(' LIKE ? AND ')+" LIKE ?"}
        `
        console.log(sql);
        let insert = valuesArray;
        console.log(insert);
        let [[entities], _] = await db.execute(sql, insert);
        console.log(entities);
        return entities;
    },
    update: async (first_name, last_name, last_updated) => {

    },
    delete: async (id) => {

    }
}

export default baseRepo;