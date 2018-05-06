const router = require('express').Router()
const { test, login } = require('./app/controller/auth')

router.get('/test', test);

router.post('/mid', login);

module.exports = router
