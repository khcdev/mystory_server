const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan(':method :url :status :response-time ms'));

app.get('/', (req, res) => {
    res.send('hi');
});

app.listen(3000, () => {
    console.log('server is running .. port : 3000')
});