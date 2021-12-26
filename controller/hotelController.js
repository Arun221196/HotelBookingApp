var userModel = require('../model/userModel');
var hotelModel = require('../model/hotelModel');

module.exports = {
    addHotel: function (req, res) {
        var postData = req.body;
        if (res?.userData?.role_id == 1) {
            if (
                postData.hotelName
                && postData.hotelDesc
                && postData.hotelLocation
                && postData.ownerId
            ) {
                userModel.checkUserExist(postData, function (userModelErr, userModelData) {
                    if (!userModelErr && userModelData.user_id) {

                        hotelModel.addHotel(postData, function (err, hotelRes) {
                            if (!err) {
                                res.send({ status: true, ...hotelRes });
                            }
                            else {
                                res.send({ status: false, message: 'Hotel insertion failed' });
                            }
                        });

                    }
                    else {
                        res.send({ status: false, message: 'owner not exist' });
                    }

                });
            }
            else {
                res.send({ status: false, message: 'invalid request input' });
            }
        }
        else {
            res.send({ status: false, message: 'Admin only can add the hotel' });
        }
    },
    updateHotel: function (req, res) {
        var postData = req.body;
        if (
            postData.hotelName
            && postData.hotelId
        ) {
            hotelModel.updateHotel(postData, res.userData, function (err, hotelRes) {
                if (!err) {
                    res.send({ status: true, ...hotelRes });
                }
                else {
                    res.send({ status: false, message: err.message || 'Hotel update failed' });
                }
            });
        }
        else {
            res.send({ status: false, message: 'invalid request input' });
        }
    },
    getHotel: function (req, res) {

        hotelModel.getHotel(function (err, hotelRes) {
            if (!err) {
                res.send({ status: true, data: hotelRes });
            }
            else {
                res.send({ status: false, message: 'No hotel found' });
            }
        });
    }
}