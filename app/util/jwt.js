const jwt = require('jsonwebtoken');

exports.createToken = (data) => { 

    let payload = {

        'userid': data.userid,
        'uuid': data.uuid,
        'uEmail': data.uEmail,
        'uName': data.uName,

    }

    let token = jwt.sign(payload, 'test', {algorithm: 'HS256', expiresIn: '30m'});

    return token;

}