
const router = require('express').Router()
const { test, findID, findPW, login } = require('./app/controller/auth')

router.get('/test', test);
router.post('/findID', findID);
router.post('/findPW', findPW);
router.post('/auth', login);

module.exports = router
