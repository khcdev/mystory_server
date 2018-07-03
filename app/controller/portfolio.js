const mysql = require('mysql');
const express = require('express');
//const dbPool = require('../config/dbconfig');
const bodyParser = require('body-parser');
const { getDBConnection, queryExecute} = require('../util/db');

//포트폴리오 추가
exports.addPortfolio = async(req,res,next)=>{
  var i;
  var contT = { port_num : null, port_name: req.body.port_name, name_int: req.body.name_int, email_int : req.body.email_int, age_int: req.body.age_int, sex_int: req.body.sex_int, phone_int: req.body.phone_int, userid:req.body.userid };
  console.log(req.body.age_int);
  console.log(req.body.port_name);
  if( !req.body ){
    res.status(400).send('plz input info!');
  }

  let query = 'INSERT INTO PORTFOLIO SET ?';

  let conn = await getDBConnection();
  let result = await queryExecute(conn, query, contT);
  console.log('insert result : '+result[0]);
  query = 'SELECT LAST_INSERT_ID() AS last_id;'

  result = await queryExecute(conn, query);
  const port_num = result[0].last_id;
  console.log('last_insert_id : '+port_num);
  query = 'INSERT INTO PORT_PROJ SET ?';

  console.log('before loop'+'//contj legth : '+req.body.project_list.length);
  for(i=0; i<req.body.project_list.length;i++){
    console.log('inloop');
    var contJ = { port_proj_id : null, port_num : port_num, proj_num : req.body.project_list[i].proj_num, proj_int : req.body.project_list[i].proj_int };
    result = await queryExecute(conn, query, contJ);
    console.log('port_pro '+i+' result : '+result);
  }
  console.log('after loop');


  conn.release();
  res.status(200).send(result);
  //+a 외래키로 삽입 proj_num, port_num

}


//포트폴리오 삭제
exports.delPortfolio = async(req,res,next)=>{
  let port_num = req.body.port_num;
  console.log("reqbody : " + req.body.port_num);
  const deleted_port = 1;
  let query = 'UPDATE PORTFOLIO SET DELETED_PORT = 1 WHERE PORT_NUM = ?;';
  console.log("port num is : "+port_num);
  let conn = await getDBConnection();
  let result = await queryExecute(conn, query, [ port_num ]);
  console.log("delete result is : "+result);
  conn.release();
  res.status(200).send(result);

}
//포트폴리오 검색
exports.searchPortfolio = async(req,res,next)=>{
//  const {}

}//검색어 무엇?

//포트폴리오 조회(디테일)
exports.portfolioDetail = async(req,res,next)=>{
  const { port_num } = req.query;

  console.log('port_num : ' + port_num);
  //const { proj_int, name_int, email_int, age_int, sex_int, phone_int, deleted_port};
  let query = 'SELECT NAME_INT AS n, EMAIL_INT AS e, AGE_INT AS a, SEX_INT AS s, PHONE_INT AS p '+'FROM PORTFOLIO '+'WHERE PORT_NUM = ?;';
  let conn = await getDBConnection();
  let result = await queryExecute(conn, query, [ port_num ]);
/*  resMsg = {
    "msg" : "get page success",
    "name_int" : result[0].n,
    "email_int" : result[0].e,
    "age_int" : result[0].a,
    "sex_int" : result[0].s,
    "phone_int" : result[0].p
  }*/
  //console.log("resMsg : " +resMsg);
  query = 'SELECT * ' + 'FROM PORT_PROJ ' +'WHERE PORT_NUM = ?';
  let result2 = await queryExecute(conn, query, [ port_num ]);
  let arrlist=[];
  var i;
  //console.log("result2 : " +result2[2]);

  for(i = 0; i<result2.length; i++){
    arrlist.push({"proj_num":result2[i].proj_num, "proj_int":result2[i].proj_int});
    console.log(i);
    console.log("proj_num : " + result2[i].proj_num);
    console.log("proj_int : " + result2[i].proj_int);

  }

  resProjMsg={
    "msg" : "get page success",
    "name_int" : result[0].n,
    "email_int" : result[0].e,
    "age_int" : result[0].a,
    "sex_int" : result[0].s,
    "phone_int" : result[0].p,
    "proj_num & proj_int" : arrlist
  }
  console.log("resprojmsg : "+resProjMsg);
  conn.release();
  res.status(200).send(resProjMsg);
}

//포트폴리오 수정
exports.updatePortfolio = async(req, res, next)=>{
  //const reqBody = req.body.port_info;
  let port_num = req.body.port_num;
  let conn = await getDBConnection();
  var i;
  console.log("port_num : "+req.body.port_num);
  console.log("port_info : "+req.body.port_info[0]);
//  console.log("proj_info/proj_int : "+req.body.proj_info[0].proj_int);
//  console.log("new_port_info : "+req.body.new_proj_info[0]);

  if(req.body.port_info){
    console.log(1);
    let query = 'UPDATE PORTFOLIO SET ? '+'WHERE PORT_NUM = ?;';
    let result = await queryExecute(conn, query, [ req.body.port_info[0], port_num ]);
    console.log('port_info result : '+result);
  }//portfolio 내용 수정
  if(req.body.proj_info){
      console.log(2);
    let query = 'UPDATE PORT_PROJ SET PROJ_INT = ? ' +'WHERE PORT_NUM = ? AND PROJ_NUM = ?;';
  console.log(3);
    for(i=0;i<req.body.proj_info.length;i++){
      let result = await queryExecute(conn, query, [req.body.proj_info[i].proj_int, port_num, req.body.proj_info[i].proj_num]);
      console.log('proj_int result : '+result);
    }
  }//proj 공개비공개삭제 바뀌었을때
  if(req.body.new_proj_info){
      console.log(4);
    query = 'INSERT INTO PORT_PROJ SET ?;';
  console.log(5);
    for(i=0; i<req.body.new_proj_info.length;i++){
      result = await queryExecute(conn, query, [ req.body.new_proj_info[i], port_num]);
      console.log('port_proj '+i+' result : '+result);
    }
      console.log(6);
  } //project 추가되었을때
    console.log(7);
  conn.release();
  resMsg = {
    "msg" : "success updating"
  }
  res.status(200).send(resMsg);
}


/*
//포트폴리오 내 프로젝트 추가
exports.addProject = async(req, res)=>{
  const { proj_num, }
}
exports.updateProject = async(req, res)=>{

}*/
