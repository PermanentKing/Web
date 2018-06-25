'use strict';
var express = require('express');
var session = require('express-session');
var router = express.Router();


router.get('/', function(req, res) {
    req.session.signin = false;
    req.session.myuser = null;
    res.redirect('/');
});


module.exports = router;
