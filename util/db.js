const dbPool = require("../app/config/dbconfig");

exports.getDBConnection = () => {
    return new Promise( (resolve, reject) => {
        dbPool.getConnection( (err, conn) => {
            if (err){
                console.log('error')
                return reject(err);
            }
            console.log('not error')
            resolve(conn);
        });
    });
}

exports.queryExecute = (conn, sql, args) => {
    return new Promise( (resolve, reject) =>{
        conn.query(sql, args, (err, result) =>{
           if (err){
               conn.release();
               return reject(err);
           }
           resolve(result); 
        })
    });
}