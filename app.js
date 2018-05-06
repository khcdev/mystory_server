const express = require("express");
const morgan = require("morgan");
const router = require('./router')

const app = express();

app.use(morgan(':method :url :status :response-time ms'));
app.use('/api', router)

app.listen(3000, () => {
    console.log('server is running .. port : 3000')
});