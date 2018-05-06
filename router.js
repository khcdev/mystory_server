const router = require('express').Router();
const { test, login } = require('./app/controller/auth');

router.get('/test' ,test);

router.post('/auth', login);

module.exports = router
