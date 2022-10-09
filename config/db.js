import {} from 'dotenv/config'

import mysql from 'mysql2';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
});

// import logRepo from "../repos/logRepo.js";

// let sql = `SELECT * FROM actor LIMIT 0, 10`;

// pool.promise().execute(sql)
//     .then(data => {
//         console.table(data[0])
//     })
//     .catch(err => { 
//         let errorObject = {
//             "status": 500,
//             "statusText": "Internal Server Error",
//             "message": err.message,
//             "error": 
//                 {
//                 "errno": err.errno,
//                 "call": err.syscall,
//                 "code": "INTERNAL_SERVER_ERROR",
//                 "message": err.messages
//                 }
//         }
//         logRepo.write(errorObject, function (data) {
//             console.log(data);
//         }, function (err) {
//             console.error(err);
//         });
//         console.error(err)
//     });

export default pool.promise();