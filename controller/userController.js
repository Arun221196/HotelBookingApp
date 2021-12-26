var middleware = require('../middleware');
var userModel = require('../model/userModel');

module.exports = {
    login: function (req, res) {
        // console.log(req.body);
        var postData = req.body;

        if (postData.username && postData.password) {
            userModel.checkUserExist(postData, function (userModelErr, userModelData) {
                if (!userModelErr && userModelData?.user_id) {

                    middleware.signIn(userModelData, function (err, signInRes) {
                        if (!err) {
                            res.send({ status: true, ...signInRes });
                        }
                        else {
                            res.send({ status: false, message: 'user not exist' });
                        }
                    });
                }
                else {
                    res.send({ status: false, message: 'user not exist' });
                }

            });
        }
        else {
            res.send({ status: false, message: 'user name or password cant be empty' });
        }

    },
    signUp: function(req,res){
        var postData = req.body;
        if (postData.username && postData.password) {
            userModel.checkUserExist(postData, function (userModelErr, userModelData) {
                if (!userModelErr && userModelData == undefined) {

                    let isAdmin = res?.isAdmin || false;

                    userModel.signUp(postData,isAdmin, function (err, signUpRes) {
                        if (!err) {
                            res.send({ status: true, ...signUpRes });
                        }
                        else {
                            res.send({ status: false, message: 'user signup failed' });
                        }
                    });

                }
                else {
                    res.send({ status: false, message: 'user already exist' });
                }

            });
        }
        else {
            res.send({ status: false, message: 'user name or password cant be empty' });
        }
    }
    
}