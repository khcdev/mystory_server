const router = require('express').Router();
const { test, findID, findPW, login, signUp, signUpMain, memberLeave, proj, projCreate, projModify } = require('./app/controller/auth')
const {validToken} = require('./app/util/jwt');

router.get('/test', test);
router.post('/findID', validToken, findID);
router.post('/findPW', findPW);
router.post('/auth', login);

router.route('/join')
.get(signUp)
.post(signUpMain)
.delete(memberLeave);

router.route('/project')
.get(proj)
.post(projCreate)
.put(projModify);

//router.use(validToken);

module.exports = router
