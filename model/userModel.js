var connection = require('../connection');
var crypto = require('../libraries/crypto');

module.exports = {
    checkUserExist: function (input, callback) {

        let filterData = {};

        if (input['username'] && input['password']) {
            filterData = { user_name: input['username'] };
        }
        else if (input['ownerId']) {
            filterData = { user_id: input['ownerId'] };
        }

        connection
            .table('user')
            .filter(filterData)
            .getAll()
            .then(doc => {
                let findUser = doc.find(userVal => {
                    // userVal.password = JSON.parse(userVal.password);
                    return input['password'] == crypto.decrypt(userVal.password);
                });
                // console.log(doc)
                return callback(null, findUser);
            })
            .catch(err => {
                return callback(err, {});
            });
    },
    signUp: function (input, isAdmin, callback) {

        let roleId = isAdmin ? input.roleId : 2; // 2 is normal user

        input['password'] = crypto.encrypt(input['password']);
        // input['password'] = JSON.stringify(input['password']);

        connection
            .table('user')
            .insert({
                user_name: input['username'],
                password: input['password'],
                role_id: roleId,
            })
            .then(res => {
                if (res.insertId) {
                    return callback(null, res);
                }
            })
            .catch(err => {
                return callback(err, {});
            });
    }

}