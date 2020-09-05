const jwt = require('jsonwebtoken');

function validateUser(req, res, next) {
    jwt.verify(req.headers['token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({
                status: "error",
                message: err.message,
                data: null
            });
        } else {
            req.body.userId = decoded.id;
            next();
        }
    });
}

function accNumGen(){
    return Math.floor(Math.random() * 100000000000);
}

module.exports={ validateUser, accNumGen};