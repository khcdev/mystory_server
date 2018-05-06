const dbPool = require('../config/dbconfig');

exports.test = async (req, res) => {
    console.log("Hello World");
    res.send(200, "Hello");  
}

exports.login = async (req, res) => {

    console.log('[API : /api/login] Success');

    dbPool.getConnection((err, conn) => {

        if(err){

            let dbPoolObject = {

                'code' : 0,
                'content' : 'DBpool에서 에러 발생'

            };

            console.log('error dbconfig : ', err);
            res.status(404).send(dbPoolObject);
            conn.release();

        }

        let email = req.body.email;
        let pw = req.body.pw;

        let selectQuery = 'SELECT * FROM USER WHERE email = ?;';

        conn.query(selectQuery, email, (err, queryResult) => {

            if(err){

                let queryObject = {

                    'code' : 0,
                    'content' : 'Query에서 에러 발생'

                }

                conn.release();
                console.log('error query : ', err);
                res.status(404).send(queryObject);

            }

            conn.release();
            
            let data = queryResult[0];

            if(data.password == pw){

                console.log('valid');

                let responseObject = {

                    'code' : 1,
                    'token' : null,
                    'content' : '로그인을 성공하셨습니다.'

                };

                res.status(200).send(responseObject);
                

            }else{

                let responseObject = {

                    'code' : 0,
                    'content' : '아이디 또는 비밀번호를 다시 확인해주세요'

                };

                res.status(200).send(responseObject);

            }

        });

    });

}