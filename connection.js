var mysqli = require('mysqli');

var mysqliConStr = new mysqli({
    host: 'localhost',
    port: '',
    user: 'root',
    password: 'Root@123',
    charset: '',
    db: 'HotelBookingApp'
});
var mysqliCon = mysqliConStr.emit(true);

module.exports = mysqliCon;