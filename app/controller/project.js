const { getDBConnection, queryExecute} = require('../util/db');
const moment = require('moment');
var path = require('path');
const mysql = require('mysql');
const express = require('express');
const dbPool = require('../config/dbconfig');

// 프로젝트 생성 화면 불러옴
exports.proj = async(req, res) => {
    console.log("Project create");
}

// 프로젝트 생성 페이지
exports.projCreate = async(req, res) => {
    var post  = { user_id:req.body.user_id,
                  proj_num:null,
                  proj_name:req.body.name,
                  proj_role:req.body.role,
                  proj_startDate:req.body.startDate,
                  proj_endDate:req.body.endDate,
                  proj_des:req.body.des,
                  proj_git:req.body.git };

    sql = 'INSERT INTO PROJECT SET ?'

    dbPool.getConnection(function(err, conn){
        if (err) {
            res.send(400, {code: -1})
        }

        if(!req.body.name || !req.body.role || !req.body.startDate || !req.body.des){
            let resMes={
                'message':'Insert Data'
            }
            res.status(400).send(resMes);
            console.log('Insert Data');
        }
        else{
            conn.query(sql, post, function(err, result){
                console.log(result);

                let resMess = {
                    'message': 'success'
                };
                res.status(200).send(resMess);
            });
        }
    });
}


// 프로젝트 수정 페이지
exports.projModify = async(req, res) => {
    var targetData  = { proj_name:req.body.name,
                        proj_role:req.body.role,
                        proj_startDate:req.body.startDate,
                        proj_endDate:req.body.endDate,
                        proj_des:req.body.des,
                        proj_git:req.body.git };

    let id = req.body.id;

    sql = 'UPDATE PROJECT SET ? where proj_num=?';

    dbPool.getConnection(function(err, conn){
        if (err) {
            res.send(400, {code: -1})
        }

        if(!req.body.name || !req.body.role || !req.body.startDate || !req.body.des){
            let resMes={
                'message':'Insert Data'
            }
            res.status(400).send(resMes);
            console.log('Insert Data');
        }
        else{
            conn.query(sql,[targetData, id], function(err, result){
                console.log(result);

                let resMess = {
                    'message': 'success'
                };
                res.status(200).send(resMess);
            });
        }
    });
}

// 프로젝트 삭제 페이지
exports.projDelete = async(req, res) => {
    let id = req.body.id;

    sql = 'DELETE FROM PROJECT where proj_num=?';

    dbPool.getConnection(function(err, conn){
        if (err) {
            res.send(400, {code: -1})
        }

        conn.query(sql, id, function(err, result){
            console.log(result);

            let resMess = {
                'message': 'success'
            };
            res.status(200).send(resMess);
        });
    });
}

// 프로젝트 검색 페이지
exports.projShow = async(req, res) => {
    let id = req.body.id;

    sql = 'SELECT * FROM PROJECT where proj_num=?';

    dbPool.getConnection(function(err, conn){
        if (err) {
            res.send(400, {code: -1})
        }

        conn.query(sql, id, function(err, result){
            console.log(result[0]);

            let resMess = {
                'message': 'success'
            };
            res.status(200).send(resMess);
        });
    });
}
