const router = require('express').Router()
const { test, findID, findPW, login, signUp, signUpMain, memberLeave } = require('./app/controller/auth')
const { proj, projCreate, projModify, projDelete, projShow } = require('./app/controller/project');

router.get('/test', test);
router.post('/findID', findID);
router.post('/findPW', findPW);
router.post('/auth', login);

router.route('/join')
.get(signUp)
.post(signUpMain)
.delete(memberLeave);

router.route('/project')
.get(proj)
.post(projCreate)
.put(projModify)
.delete(projDelete);

router.route('/projDetail')
.post(projShow);

module.exports = router
