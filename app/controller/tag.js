const { getDBConnection, queryExecute} = require('../util/db');
const moment = require('moment');
var path = require('path');
const mysql = require('mysql');
const express = require('express');
const dbPool = require('../config/dbconfig');

// 태그 추가
// 태그를 입력했을 때, DB에 입력받은 태그가 없으면 DB에 추가
exports.getTagName = async(res, req, next) => {
    var post  = { stack_name = req.body.tagName, stack_num = null };
    
    sql = 'INSERT INTO STACK SET ?'

    dbPool.getConnection(function(err, conn){
        if (err) {
            next(err);
            // res.send(400, {code: -1})
        }

        if(stack_name != req.body.tagName){ // 입력한 stack이 db에 없으면
            conn.query(sql, post, function(err, result){
                console.log(result);
           
                let resMess = {
                    'message': 'new stack insert'
                };
                res.status(200).send(resMess);
            });
        }
        else{ // 입력한 stack이 db에 있으면
            let resMes={
                'message':'existing stack'
            }
            res.status(400).send(resMes);
            console.log('Insert Data');
        }
        
    });    
}

// 태그 검색
// 입력하는 글자 그대로의 태그를 스택 테이블에서 검색.. 없으면 추가..! 있으면 그 태그 사용!
exports.showTag = async(res, req, next) => {
    var post  = { stack_name = req.body.tagName, stack_num = null };
    
    sql = 'SELECT * FROM STACK where stack_name=?';

    dbPool.getConnection(function(err, conn){
        if (err) {
            next(err);
            // res.send(400, {code: -1})
        }
        
        conn.query(sql, post, function(err, result){
            console.log(result);
           
            let resMess = {
                'message': 'stack search'
            };
            res.status(200).send(resMess);
        });
    });
}