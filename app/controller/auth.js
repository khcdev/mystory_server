var mysql = require('mysql');
var express = require('express');
var dbPool = require('../config/dbConfig');
var bodyParser = require('body-parser');

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
/*  if(!req.body){
    res.status(400).send('please input name and phone number!!');
  }

//    let query = 'SELECT EMAIL'+'FROM USER'+'WHERE PHONE = ?;';

  //dbPool.getConnection()
  dbPool.getConnection((err, conn) => {
          if (err) return next(err);

          let name = req.body.name;
          let email = req.body.email;

          getFindPWSql =
          'select password ' +
          'from user ' +
          'where email = ?;';

          conn.query(getFindPWSql, email, (err, query_result) => {
              if (err) {
                  conn.release();
                  return next(err);
              }
              let data = query_result[0];


              if (data.name == name){
                  let password = data.password;
                  console.log('your password is :' + password);
                  //let cookie =
              }
              else {
                console.log('no data matched!');
              }

              conn.release();
              responseObjenct = {
                  "msg": "success",
                  "your password" : password
              }
              res.status(200).send(responseObjenct)
          });
      });*/
}
