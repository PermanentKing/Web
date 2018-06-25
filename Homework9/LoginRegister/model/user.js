/**
 * Created by egtch.com on 2017/4/18.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    sid: String,
    phone: String,
    email: String
});

module.exports = mongoose.model('user', UserSchema,'user');
