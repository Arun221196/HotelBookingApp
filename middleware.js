var jwt = require('jsonwebtoken');
var config = require('./config');

module.exports = {
    signIn: function (postData, callback) {
        var token = jwt.sign({
            data: postData
        }, config.secretKey, { expiresIn: config.signInTimeout });
        console.log(token);
        callback(null, { token, expires: config.signInTimeout });
    },
    checkAuth: function (req, res, next) {
        if (req.headers['authorization']) {

            jwt.verify(req.headers['authorization'], config.secretKey, function (err, decoded) {
                if (decoded) {
                    res.userData = decoded.data;
                    next();
                }
                else {
                    res.status(401);
                    res.send({status: false, message: 'Token Expired or Invalid token' });
                }
            });
        }
        else {
            res.status(401);
            res.send({status: false, message: 'Need authorization token' });
        }
    },
    checkIsAdmin: function (req, res, next) {
        res.isAdmin = false;
        if (req.headers['authorization']) {

            jwt.verify(req.headers['authorization'], config.secretKey, function (err, decoded) {
                if (decoded?.data?.role_id == 1) {
                    res.isAdmin = true;
                    next();
                }
                else {
                    next();
                }
            });
        }
        else {
            next();
        }
    }
}