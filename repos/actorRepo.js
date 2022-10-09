import db from '../config/db.js';

let actorRepo = {
    get: async () => {
        let sql = `SELECT * FROM sakila.actor`;
        let [actors, ] = await db.execute(sql)
        return actors;
    },

    getById: async (id) => {
        let sql = `SELECT * FROM sakila.actor WHERE actor_id = ?`;
        let insert = [id];
        let [[actor], _] = await db.execute(sql, insert);
        return actor;
    },
    insert: async (first_name, last_name, updatedAtDate) => {
        let sql = 
        `
        INSERT INTO sakila.actor (
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

        let [resultSetHeader, ] = await db.execute(
            sql, 
            [first_name, last_name, updatedAtDate], 
            (err, results, fields) => {
                console.log({"Results": results});
                console.log({"Fields": fields});
            });
        let actorId = resultSetHeader.insertId;
        let newActor = await actorRepo.getById(actorId)
        return newActor;
    },
    update: async (first_name, last_name, last_updated) => {

    },
    delete: async (id) => {

    }
}

export default actorRepo;