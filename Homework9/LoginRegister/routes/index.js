'use strict';
var express = require('express');
var session = require('express-session');
var router = express.Router();


router.get('/', function(req, res) {
  if (req.session.signin == true) {
    if (req.session.myuser.name == req.query.username) {
      req.session.yourself = true;
      res.redirect('/home');
    } else {
      req.session.yourself = false;
      res.redirect('/home');
    }
  } else {
    if (req.session.err == true) {
      req.session.err = false;
      res.render('index', {
        title: '用户名或密码错误'
      });
    } else {
      res.render('index', {
        title: '登录'
      });
    }
  }
});


module.exports = router;
