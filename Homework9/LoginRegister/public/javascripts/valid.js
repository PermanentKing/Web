var isRight = false;
var checkemail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
var checkname = /^[a-zA-Z][\w\_]{5,17}/;
var checkid = /^[1-9][0-9]{7}$/;
var checkphone = /^[1-9][0-9]{10}$/;
var checkpass = /^[1-9a-zA-Z\_-]{6,12}/;
var oInput;
var oWarn;
var oSubmit;
var warnFunc;
window.onload = function(){
  oInput = document.getElementsByClassName('form-control');
  oWarn = document.getElementsByClassName('warning');
  oSubmit = document.getElementById('submit-button');

   warnFunc = function(){
    if(checkemail.test(oInput[3].value)==true){
      isRight = true;
      oWarn[3].innerHTML = "";
    }else{
      oWarn[3].innerHTML = "email's format is wrong!";
      isRight = false;
    }
    if(checkname.test(oInput[0].value)==true&&oInput[0].value.length>=6&&oInput[0].value.length<=18){
      if(isRight==true){
        isRight = true;
      }
      oWarn[0].innerHTML = "";
    }else{
      if(/[^\w]/.test(oInput[0].value)==true){
        oWarn[0].innerHTML = "invalid character!";
      }else if (oInput[0].value.length<=5) {
        oWarn[0].innerHTML = "username should more than or equal 6 characters!";
      }else if (oInput[0].value.length>=19){
        oWarn[0].innerHTML = "username shouldn't more than 18 characters!";
      }else{
        oWarn[0].innerHTML = "wrong input!";
      }
      isRight = false;
    }if(checkid.test(oInput[1].value)==true){
      if(isRight==true){
        isRight = true;
      }
      oWarn[1].innerHTML = "";
    }else{
      if(/[^0-9]+/.test(oInput[1].value)==true){
        oWarn[1].innerHTML = "invalid characters!";
      }else if (oInput[1].value.length!=8) {
        oWarn[1].innerHTML = "id should equal 8 characters!";
      }else if(/^0{1}/.test(oInput[1].value)==true){
        oWarn[1].innerHTML = "id shouldn't start from 0!";
      }else{
        oWarn[1].innerHTML = "wrong input!";
      }
      isRight = false;
    }if(checkphone.test(oInput[2].value)==true){
      if(isRight==true){
        isRight = true;
      }
      oWarn[2].innerHTML = "";
    }else{
      if(/[^0-9]+/.test(oInput[2].value)==true){
        oWarn[2].innerHTML = "invalid characters!";
      }else if (oInput[2].value.length!=11) {
        oWarn[2].innerHTML = "phone should equal 8 characters!";
      }else if(/^0{1}/.test(oInput[2].value)==true){
        oWarn[2].innerHTML = "phone shouldn't start from 0!";
      }else{
        oWarn[2].innerHTML = "wrong input!";
      }
      isRight = false;
    }if(checkpass.test(oInput[4].value)==true){
      if(isRight==true){
        isRight = true;
      }
      oWarn[4].innerHTML = "";
    }else{
      oWarn[4].innerHTML = "password only can be 0-9, a-z, A-Z, -and_ !";
      isRight = false;
    }
  }

}


var checkRight = function(){
  isRight = false;
  warnFunc();
  return isRight;
}
