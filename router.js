const router = require('express').Router()
const { test, findID, findPW, login, signUp, signUpMain, memberLeave, authValid} = require('./app/controller/auth');
const {validToken} = require('./app/util/jwt');

router.get('/test', test);
router.post('/findID', findID);
router.post('/findPW', findPW);
router.post('/auth', login);

router.route('/join')
.get(signUp)
.post(signUpMain)
.delete(memberLeave);

router.use(validToken);

module.exports = router
