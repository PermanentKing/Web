'use strict';
var express = require('express');
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
  } else{
    res.render('regist', { title: '用户注册' });
  }
});


module.exports = router;
