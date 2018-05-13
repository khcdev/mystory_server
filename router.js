const router = require('express').Router()
const { test, findID, findPW } = require('./app/controller/auth')

router.get('/test', test);
router.post('/findID', findID);
router.post('/findPW', findPW);


module.exports = router
