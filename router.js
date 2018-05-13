const router = require('express').Router();
const express = require('express');
const { test, signUp, signUpMain, memberLeave } = require('./app/controller/auth');

router.get('/test', test);

router.route('/join')
.get(signUp)
.post(signUpMain)
.delete(memberLeave);

module.exports = router
