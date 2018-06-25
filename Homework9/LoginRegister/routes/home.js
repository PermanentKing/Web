'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../model/user');
/*导入node的加密库*/
var crypto = require('crypto');
/* 创建路由，并使用post接受index传递过来的name和password */
var session = require('express-session');

router.get('/', function(req, res) {
  if(req.session.signin==true){
    var nowuser = req.session.myuser;
    console.log(nowuser);
    if(req.session.yourself==true){
      res.render('home', { title: '详细信息',name: nowuser.name, sid: nowuser.sid, phone: nowuser.phone, email: nowuser.email });
    }else{
      res.render('home', { title: '只能访问自己的数据',name: nowuser.name, sid: nowuser.sid, phone: nowuser.phone, email: nowuser.email });
    }
  }else{
    res.redirect('/');
  }
})

router.post('/', function(req, res, next) {
    var md5 = crypto.createHash('md5');
    var password = req.body.password;//获得传递过来的password
    var name = req.body.name;//获得传递过来的name
    md5.update(password+name);//MD5混淆加密内容为password+name
    var pwd = md5.digest('base64');//将加密好的MD5以base64的形式展现出来
    if(pwd==='' && name ===''){//假如传递过来的name和password为空
        res.render('home', { title: '发生错误',name:'请输入用户名和密码' });//路由则传递相关错误信息
    }
    //console.log(pwd+' '+name);
    /* 查询数据库中的name与password是否与用户输入的一致，使用findOne({},callback)方法 */
    user.findOne({ name:name,password:pwd },function (err, doc) {
        if (err) return next(err);
            if(doc){
              req.session.err = false;
              req.session.myuser = doc;
              req.session.signin = true;
              res.render('home', { title: '详细信息',name:name, sid: doc.sid, phone: doc.phone, email: doc.email });
            }else{
            /*res.render('index',{title:'检查您的用户名及密码'/*,name:'请检查您的用户名及密码', sid: '', phone: '', email: ''});*/
            req.session.err = true;
            res.redirect('/');
            }
    });
});

module.exports = router;
