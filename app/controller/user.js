// User Controller
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const { getDBConnection, queryExecute} = require('../util/db');

exports.userInfo = async(req, res)=>{
  const { userid } = req.body;

  if(!req.body){
    res.status(400).send('plz send userid');
    let query = 'SELECT PHONE, EMAIL, AGE, SEX, NAME' + 'FROM USER WHERE USERID = ?;';
    let conn = await getDBConnection();
    let result = await queryExecute(conn, query, [ userid ]);
    resMsg = {
      "msg" : "success".
      "name" : result[0].name,
      "phone" : result[0].phone,
      "email" : result[0].email,
      "age" : result[0].age,
      "sex" : result[0].sex
    }
    console.log('result is' + resMsg);
    conn.release();
    res.status(200).send(resMsg);
  }
}
