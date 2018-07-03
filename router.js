const router = require('express').Router();
const { test, findID, findPW, login, signUp, signUpMain, memberLeave } = require('./app/controller/auth');
const { searchPortfolio, delPortfolio, addPortfolio, portfolioDetail, updatePortfolio } = require('./app/controller/portfolio');
router.get('/test', test);
router.post('/findID', findID);
router.post('/findPW', findPW);
router.post('/auth', login);
//portfolio
router.route('/portfolio')
.get(portfolioDetail)
.post(addPortfolio)
.delete(delPortfolio)
.put(updatePortfolio);
//router.route('/portfolio/project')
//.post(addProject)
router.get('/searchPortfolio', searchPortfolio);

router.route('/join')
.get(signUp)
.post(signUpMain)
.delete(memberLeave);

module.exports = router
