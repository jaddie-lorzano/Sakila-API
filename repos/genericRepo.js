import db from '../config/db.js';

let genericRepo = {
    get: async (table_name) => {
        let sql = `SELECT * FROM ??`;
        let insert = [table_name];
        let [entities, ] = await db.execute(sql, insert);
        return entities;
    },

    getById: async (id, table_name) => {
        let sql = `SELECT * FROM ${table_name} WHERE ${table_name}_id = ?`;
        let insert = [id];
        let [[entity], _] = await db.execute(sql, insert);
        return entity;
    },
    insert: async (insert, table_name) => {
        let sql = 
        `
            INSERT INTO ${table_name} (
                first_name,
                last_name,
                last_update
            )
            VALUES(
                ?,
                ?,
                ?
            )
        `;
        console.log(insert);
        let [entity, ] = await db.execute(sql, [ 'new PostMan 22', 'Test 22', '2022-10-9 8:3:17' ]);
        let insertId = entity.insertId;
        let newEntity = await genericRepo.getById(insertId);
        return newEntity;
    },
    update: async (first_name, last_name, last_updated) => {

    },
    delete: async (id) => {

    }
}

export default genericRepo;