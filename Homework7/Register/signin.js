var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var url = require('url');
var path = require('path');
var myobj = [];

var server = http.createServer(function(req, res) {
  var pathname = __dirname + url.parse(req.url).pathname;
  /*readFile*/
  /*fs.readFile('signer.txt', function(err, filedata){
    if(err){
      return console.error(err);
    }else{
      console.log("aaa");
      var tempStr = filedata.toString();
      console.log(tempStr);
      var stringarr = tempStr.split("\n");
      console.log(stringarr[0]);
      console.log(stringarr[1]);
    }
  })*/

  if (req.url.indexOf('username') != -1) {
    var queryStr = url.parse(req.url).query;
    var tempobj = querystring.parse(queryStr);
    var temp;
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    if(finduser(tempobj.username)==true){
      temp = getUser(tempobj.username);
      res.write("<!DOCTYPE html>");
      res.write("<html>");
      res.write("<head>");
      res.write("<title>Sign</title>");
      res.write('<link rel="stylesheet" href="master.css" />');
      res.write("</head>");
      res.write("<body>");
      res.write("<div>");
      res.write("<p><span>username: </span>");
      res.write(temp.username);
      res.write("</p>");
      res.write("<p><span>id: </span>");
      res.write(temp.id);
      res.write("</p>");
      res.write("<p><span>phone: </span>");
      res.write(temp.phone);
      res.write("</p>");
      res.write("<p><span>email: </span>");
      res.write(temp.email);
      res.write("</p>");
      res.write("</div>");
      res.write("</body>");
      res.write("</html>");
      res.end();
    }else{
      pathname = 'index.html';
      fs.readFile(pathname, function(err, data) {
        res.end(data);
      });
    }
  }else if (req.url == '/dopost' && req.method.toLowerCase() == 'post') {
    var alldata = '';
    req.on('data', function(chunk) {
      alldata += chunk;
    })
    req.on('end', function() {
      var datastring = alldata.toString();
      var obj = querystring.parse(datastring);
      var filewriteStr = JSON.stringify(obj);
      filewriteStr = filewriteStr + "\n";
      fs.appendFile('signer.txt', filewriteStr, function(err) {
        if (err) {
          console.error(err);
        }
      })
      console.log(obj.username);
      console.log(obj.id);
      console.log(obj.phone);
      console.log(obj.email);

      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      if(finduser(obj.username)||findid(obj.id)||findphone(obj.phone)||findemail(obj.email)){
        pathname = 'index.html';
        fs.readFile(pathname, function(err, data) {
          if(finduser(obj.username)==true){
            res.write("<span class='errmag'>username is existed!</span>");
          }if(findid(obj.id==true)){
            res.write("<span class='errmag'>id is existed!</span>");
          }if(findphone(obj.phone)==true){
            res.write("<span class='errmag'>phone number is existed!</span>");
          }if(findemail(obj.email)==true){
            res.write("<span class='errmag'>email is existed!</span>");
          }
          res.end(data);
        });
      }else{
      myobj.push(obj);
      res.write("<!DOCTYPE html>");
      res.write("<html>");
      res.write("<head>");
      res.write("<title>Sign</title>");
      res.write('<link rel="stylesheet" href="master.css" />');
      res.write("</head>");
      res.write("<body>");
      res.write("<div>");
      res.write("<p><span>username: </span>");
      res.write(obj.username);
      res.write("</p>");
      res.write("<p><span>id: </span>");
      res.write(obj.id);
      res.write("</p>");
      res.write("<p><span>phone: </span>");
      res.write(obj.phone);
      res.write("</p>");
      res.write("<p><span>email: </span>");
      res.write(obj.email);
      res.write("</p>");
      res.write("</div>");
      res.write("</body>");
      res.write("</html>");
      res.end();
    }
    })
  } else {
    if (path.extname(pathname) == "") {
      pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
      pathname += "index.html";
    }

    fs.exists(pathname, function(exists) {
      if (exists) {
        switch (path.extname(pathname)) {
          case ".html":
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            break;
          case ".js":
            res.writeHead(200, {
              "Content-Type": "text/javascript"
            });
            break;
          case ".css":
            res.writeHead(200, {
              "Content-Type": "text/css"
            });
            break;
          case ".gif":
            res.writeHead(200, {
              "Content-Type": "image/gif"
            });
            break;
          case ".jpg":
            res.writeHead(200, {
              "Content-Type": "image/jpeg"
            });
            break;
          case ".png":
            res.writeHead(200, {
              "Content-Type": "image/png"
            });
            break;
          default:
            res.writeHead(200, {
              "Content-Type": "application/octet-stream"
            });
        }

        fs.readFile(pathname, function(err, data) {
          res.end(data);
        });
      } else {
        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        pathname = "index.html";
        fs.readFile(pathname, function(err, data) {
          res.end(data);
        });
      }
    });
  }
}).listen(8000);

console.log('Server running at http://127.0.0.1:8000/');

var finduser = function(userr){
  for(var i = 0;i < myobj.length;i++){
    if(myobj[i].username===userr){
      return true;
    }
  }return false;
}

var findid = function(idd){
  for(var i = 0;i < myobj.length;i++){
    if(myobj[i].id===idd){
      return true;
    }
  }return false;
}

var findphone = function(ph){
  for(var i = 0;i < myobj.length;i++){
    if(myobj[i].phone===ph){
      return true;
    }
  }return false;
}

var findemail = function(mail){
  for(var i = 0;i < myobj.length;i++){
    if(myobj[i].email===mail){
      return true;
    }
  }return false;
}

var getUser = function(userr){
  for(var i = 0;i < myobj.length;i++){
    if(myobj[i].username==userr){
      return myobj[i];
    }
}
}

/*http.createServer(function (req, res) {
    var pathname=__dirname+url.parse(req.url).pathname;
    if (path.extname(pathname)=="") {
        pathname+="/";
    }
    if (pathname.charAt(pathname.length-1)=="/"){
        pathname+="index.html";
    }

    fs.exists(pathname,function(exists){
        if(exists){
            switch(path.extname(pathname)){
                case ".html":
                    res.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case ".js":
                    res.writeHead(200, {"Content-Type": "text/javascript"});
                    break;
                case ".css":
                    res.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case ".gif":
                    res.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case ".jpg":
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                    break;
                case ".png":
                    res.writeHead(200, {"Content-Type": "image/png"});
                    break;
                default:
                    res.writeHead(200, {"Content-Type": "application/octet-stream"});
            }

            fs.readFile(pathname,function (err,data){
                res.end(data);
            });
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("<h1>404 Not Found</h1>");
        }
    });
}).listen(8080, "127.0.0.1");*/
