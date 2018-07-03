const { getDBConnection, queryExecute} = require('./app/util/db');
const express = require("express");
const morgan = require("morgan");
const router = require('./router');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));


app.use(morgan(':method :url :status :response-time ms'));
app.use('/api', router);

// query_test
app.get('/testdb', async (req,res, next) => {
   // if(req){ next(err);}
    let conn = await getDBConnection();
    let result = await queryExecute(conn, "select email, name from USER");
    console.log(result);
    res.status(200).send(result);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('server is running .. port : 3000')
});
