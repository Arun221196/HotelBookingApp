var connection = require('../connection');

module.exports = {
    addHotel: function (input, callback) {
        connection
            .table('hotel')
            .insert({
                hotel_name: input.hotelName,
                hotel_desc: input.hotelDesc,
                hotel_location: input.hotelLocation
            })
            .then(res => {

                connection
                    .table('hotel_owner_mapping')
                    .insert({
                        hotel_id: res.insertId,
                        user_id: input.ownerId
                    })
                    .then(mapRes => {
                        return callback(null, mapRes);

                    })
                    .catch(err => {
                        return callback(err, {});
                    });
            })
            .catch(err => {
                return callback(err, {});
            });
    },
    updateHotel: function (input, userData, callback) {

        connection
            .table('hotel_owner_mapping')
            .filter({
                user_id: userData.user_id,
                hotel_id: input.hotelId
            })
            .get()
            .then(doc => {
                if (doc?.hotel_owner_mapping_id) {
                    connection
                        .table('hotel')
                        .filter({ hotel_id: input.hotelId })
                        .update({
                            hotel_name: input.hotelName
                        })
                        .then(updateRes => {
                            return callback(null, updateRes);
                        })
                        .catch(err => {
                            return callback(err, {});
                        })
                }
                else {
                    return callback(new Error('Owner only have access to update the hotel'), {});
                }
            })
            .catch(err => {
                return callback(err, {});
            });
    },
    getHotel:function(callback){
        connection
            .table('hotel')
            .getAll()
            .then(doc => {
                return callback(null, doc);
            })
            .catch(err => {
                return callback(err, {});
            })
    }
}