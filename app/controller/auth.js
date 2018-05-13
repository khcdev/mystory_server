const express = require('express');
const app = express();
const moment = require('moment');
var mysql = require('mysql');

var dbPool = require('../config/dbconfig.js');
var path = require('path');

exports.test = async (req, res) => {
    console.log("Hello World")
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