const router = require('express').Router()
const { test, findID, findPW, login, signUp, signUpMain, memberLeave } = require('./app/controller/auth')

router.get('/test', test);
router.post('/findID', findID);
router.post('/findPW', findPW);
router.post('/auth', login);

router.route('/join')
.get(signUp)
.post(signUpMain)
.delete(memberLeave);

module.exports = router
