var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongooseEmail = require('passport-local-mongoose-email');

var User = new Schema({
    // firstname: String,
    // lastname: String,
    // birthdate: Date
});

User.plugin(passportLocalMongooseEmail, {
  usernameField: 'email',
});

module.exports = mongoose.model('User', User);
