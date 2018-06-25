var express = require('express');
var router = express.Router();
var users = {};

router.all('*', function(req, res, next){
  req.session.user ? next() : res.redirect('/regist');
  console.log('wwwwwwwwwwwwwwwwwww');
});

router.get('/', function(req, res, next) {
  res.redirect('/signin');
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.post('/signin', function(req, res, next) {
  userManager.findUser(req.body.username, req.body.password)
  .then(function(user){
    req.session.user = user;
    req.redirect('/detail');
  })
  .catch(function(error){
    res.render('/signin', {error: 不存在 });
  })
});


router.get('/signout', function(req, res, next){
  delete req.session.user
  res.redirect('/signin');
})


router.get('/regist', function(req, res, next) {
  res.render('regist');
});

router.post('/regist', function(req, res, next) {
  var user = req.body;
  userManager.checkUser(user)
  .then(userManager.createUser)
  .then(function(){
    req.session.user = user;
    req.redirect('/detail');
  })
  .catch(function(){
      res.render('/regist', {error: 用户名密码错误 });
  })
  req.session.user = users[user.username] = user;
  console.log(user);
  res.redirect('/dopost');
});


router.get('/dopost', function(req, res, next) {
  res.render('users', {user: req.session.user });
});



module.exports = router;
