exports.test = async (req, res) => {
    console.log("Hello World");
    res.send(200, "Hello");  
}
exports.login = async (req, res) => {

    let id = req.body.id;
    let pw = req.body.pw;

    let selectQuery = 'SETLECT * FROM '

}
