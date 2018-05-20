const jwt = require('jsonwebtoken');

/*
    token 생성 기능
    payload 내용
    기본적으로 들어있는 내용: iat(토큰 발행시간)
    추가된 내용: userid, uuid, email, name, exp(토큰 만료시간, option을 통해 추가됨)
    
*/
exports.createToken = (data) => {

    let payload = {

        'userid': data.userid,
        'uuid': data.uuid

    }

    let token = jwt.sign(payload, 'test', { algorithm: 'HS256', expiresIn: '30m' });

    return token;

}

/*
    toekn값을 decode하는 함수
    return: decode된 paylaod값
*/
exports.validToken = (req, res, next) => {

    console.log('Decoding Tokne Middleware');

    token = req.body.clientToken;
    const decode = jwt.verify(token, 'test', {algorithms: 'HS256'}, (err, resault) => {

        if(err){
            console.log('call');
            toeknObject = {

                'code': 0,
                'content': 'Decode token occur error'

            }

            //console.log('err1: ', err);
            next(err);

        }
        
        return resault;

    });

    console.log('decode: ', decode);
    next();

}
