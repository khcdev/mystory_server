const router = require('express').Router()
const { test } = require('./app/controller/auth')

router.get('/test', test);

module.exports = router
