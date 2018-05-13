const moment = require('moment');
var path = require('path');
const mysql = require('mysql');
const express = require('express');
const dbPool = require('../config/dbconfig');
const token = require('../util/jwt');

exports.test = async (req, res) => {
    console.log("Hello World")
    res.send(200, "Hello")
}


exports.findID = async (req, res) => {
    const { name, phone } = req.body;
    //console.log(name, phone);
    response={"your name" : name}
    //res.status(200).send(response);

    if(!req.body){
      res.status(400).send('please input name and phone number!!');
    }

    let query = 'SELECT EMAIL '+'FROM USER '+'WHERE PHONE = ? AND NAME = ?;';

    //dbPool.getConnection()
    dbPool.getConnection((err, conn) => {
      if (err) {
        res.send(400, {code: -1})
      }

      //getFindIDSql = 'SELECT * ' +
      //                'FROM USER ' +
      //                'WHERE PHONE = ?;';

        conn.query(query,[ phone, name ], (err, query_result) => {
              if (err) {
                  conn.release();
                  //return next(err);
              }

              let data = query_result[0];

              if(data){
              console.log('your email is : ' + data);
              }
              /*if (data.name == name){
                  let email = data.email;
                  console.log('your email is :' + email);
              }*/
              else {
                console.log('no data matched!');
              }

              conn.release();
              responseMessage = {
                  "msg": "success",
                  //"last_login": data.last_login
                  "your email" : data
              }
              res.status(200).send(responseMessage);
          });
      });
}
exports.findPW = async (req, res) => {
  const { name, email } = req.body;
  //console.log(name, phone);
  response={"your name" : name}
  //res.status(200).send(response);

  if(!req.body){
    res.status(400).send('please input name and phone number!!');
  }

  let query = 'SELECT PASSWORD '+'FROM USER '+'WHERE EMAIL = ? AND NAME = ?;';

  //dbPool.getConnection()
  dbPool.getConnection((err, conn) => {
    if (err) {
      res.send(400, {code: -1})
    }

    //getFindIDSql = 'SELECT * ' +
    //                'FROM USER ' +
    //                'WHERE PHONE = ?;';

      conn.query(query,[ email, name ], (err, query_result) => {
            if (err) {
                conn.release();
                //return next(err);
            }

            let data = query_result[0];

            if(data){
            console.log('your password is : ' + data);
            }
            /*if (data.name == name){
                let email = data.email;
                console.log('your email is :' + email);
            }*/
            else {
              console.log('no data matched!');
            }

            conn.release();
            responseMessage = {
                "msg": "success",
                //"last_login": data.last_login
                "your password" : data
            }
            res.status(200).send(responseMessage);
        });
    });
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

        let selectQuery = 'SELECT userid, uuid, email, name, password FROM USER WHERE email = ?;';

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
                let authToken = token.createToken(data);

                let responseObject = {

                    'code' : 1,
                    'token' : authToken,
                    'content' : '로그인을 성공하셨습니다.'

                };

                res.cookie('MyStoryToken', authToken);
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

exports.signUp = async(req, res) =>{
    console.log("Sign Up");
};

exports.signUpMain = async(req, res) => {
    let current_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    var post  = { name: req.body.name, userid:null, uuid:null, password:req.body.password, phone:req.body.phone, email:req.body.email, age:rea.body.age, sex:req.body.sex, c_date:current_date };
    console.log(req.body.userid);
    sql = 'INSERT INTO USER SET ?'
    dbPool.getConnection(function(err, conn){
        conn.query(sql, post, function(err, result){
            console.log(result);
            res.send(result);
        });
    });
}

exports.memberLeave = async(req, res) => {
    console.log("Sign Up");
}
