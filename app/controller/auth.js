const { getDBConnection, queryExecute } = require('../../util/db');
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
    response = { "your name": name }
    //res.status(200).send(response);

    if (!req.body) {
        res.status(400).send('please input name and phone number!!');
    }

    let query = 'SELECT EMAIL ' + 'FROM USER ' + 'WHERE PHONE = ? AND NAME = ?;';

    //dbPool.getConnection()
    dbPool.getConnection((err, conn) => {
        if (err) {
            res.send(400, { code: -1 })
        }

        //getFindIDSql = 'SELECT * ' +
        //                'FROM USER ' +
        //                'WHERE PHONE = ?;';

        conn.query(query, [phone, name], (err, query_result) => {
            if (err) {
                conn.release();
                //return next(err);
            }

            let data = query_result[0];

            if (data) {
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
                "your email": data
            }
            res.status(200).send(responseMessage);
        });
    });
}

exports.findPW = async (req, res) => {
    const { name, email } = req.body;
    //console.log(name, phone);
    response = { "your name": name }
    //res.status(200).send(response);

    if (!req.body) {
        res.status(400).send('please input name and phone number!!');
    }

    let query = 'SELECT PASSWORD ' + 'FROM USER ' + 'WHERE EMAIL = ? AND NAME = ?;';

    //dbPool.getConnection()
    dbPool.getConnection((err, conn) => {
        if (err) {
            res.send(400, { code: -1 })
        }

        //getFindIDSql = 'SELECT * ' +
        //                'FROM USER ' +
        //                'WHERE PHONE = ?;';

        conn.query(query, [email, name], (err, query_result) => {
            if (err) {
                conn.release();
                //return next(err);
            }

            let data = query_result[0];

            if (data) {
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
                "your password": data
            }
            res.status(200).send(responseMessage);
        });
    });
}

/*
    login 기능
    query에서 받아온 password랑 비교해서 같으면 token발행
*/
exports.login = async (req, res) => {

    console.log('[API : /api/login] Success');

    const { email, password } = req.body;

    let conn = await getDBConnection();

    let selectQuery = 'SELECT userid, uuid, email, name, password FROM USER WHERE email = ?;';
    let data = await queryExecute(conn, selectQuery, email);

    if (data[0].password == password) {

        console.log('valid');
        let authToken = token.createToken(data[0]);

        let responseObject = {

            'code': 1,
            'token': authToken,
            'content': '로그인을 성공하셨습니다.'

        };

        //https 방식으로만 전송이 된다 이유: js에서 cookie값을 변경 못하게 하기 위해서
        res.cookie('MyStoryToken', authToken, { 'httpOnly': true });
        res.status(200).send(responseObject);


    } else {

        let responseObject = {

            'code': 0,
            'content': '아이디 또는 비밀번호를 다시 확인해주세요'

        };

        res.status(200).send(responseObject);

    }

}

exports.authValid = (req, res) => {

    const clientToken = req.body.clientToken;
    let decode = token.validToken(clientToken);

    res.status(200).send(decode);

}

// 회원가입 화면 불러옴
exports.signUp = async(req, res) =>{
    console.log("Sign Up");
};

// 회원가입 정보 입력
exports.signUpMain = async(req, res) => {
    let current_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    var post  = { name: req.body.name, userid:null, uuid:null, password:req.body.password, phone:req.body.phone, email:req.body.email, age:req.body.age, sex:req.body.sex, c_date:current_date };

    sql = 'INSERT INTO USER SET ?'
    dbPool.getConnection(function(err, conn){

        if (err) {
            res.send(400, {code: -1})
        }

        conn.query(sql, post, function(err, result){
            console.log(result);
            //res.send(result);
            
            let resMess = {
                  'msg': 'success'
            };
            res.status(200).send(resMess);
        });
    });
}

exports.memberLeave = async (req, res) => {
    console.log("Sign Up");
}


// 프로젝트 생성 화면 불러옴
exports.proj = async(req, res) => {
    console.log("Project create");
}

// 프로젝트 생성 페이지
exports.projCreate = async(req, res) => {
    var post  = { proj_num:null, proj_name:req.body.name, proj_role:req.body.role, proj_startDate:req.body.startDate, proj_endDate:req.body.endDate, proj_des:req.body.des, proj_git:req.body.git };
    
    sql = 'INSERT INTO PROJECT SET ?'
    
    dbPool.getConnection(function(err, conn){
        if (err) {
            res.send(400, {code: -1})
        }
        
        if(!req.body.name){
            let resMes={
                'msg':'Insert Project Name'
            }
            res.status(400).send(resMes);
            console.log('Insert Project Name');
        }
        else{
            conn.query(sql, post, function(err, result){
                console.log(result);
            
                let resMess = {
                    'msg': 'success'
                };
                res.status(200).send(resMess);
            });
        }
    });
}


// 프로젝트 수정 페이지
exports.projModify = async(req, res) => {


    
}