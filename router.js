const router = require('express').Router();
const { test, findID, findPW, login, signUp, signUpMain, memberLeave } = require('./app/controller/auth');
const { searchPortfolio, delPortfolio, addPortfolio, portfolioDetail, updatePortfolio } = require('./app/controller/portfolio');
const { proj, projCreate, projModify, projDelete, projShow } = require('./app/controller/project');
const { getTagName, showTag } = require('./app/controller/tag');
const {validToken} = require('./app/util/jwt');

router.get('/test', test);
router.post('/findID', validToken, findID);
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

router.route('/project')
.get(proj)
.post(projCreate)
.put(projModify)
.delete(projDelete);

router.route('/projDetail')
.post(projShow);

router.route('tag')
.post(getTagName)
.get(showTag);


//router.use(validToken);

module.exports = router
