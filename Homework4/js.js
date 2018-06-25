function findArr(a, c) {
  for (var b = 0; b < a.length; b++) {
    if (a[b] == c) {
      return true
    }
  }
  return false
}

function getClass(d, f) {
  if (document.getElementsByClassName) {
    return d.getElementsByClassName(f)
  } else {
    var a = [];
    var e = document.getElementsByTagName("*");
    for (var c = 0; c < e.length; c++) {
      var b = e[c].className.split(" ");
      if (findArr(b, f)) {
        a.push(e[c])
      }
    }
    return a
  }
};
window.onload = function() {
  var aNum = getClass(document, 'num');
  var oText = document.getElementById('text');
  var aPer = getClass(document, 'oper');
  var oDeng = getClass(document, 'deng')[0];
  var oSq = getClass(document, 'sq')[0];//delete
  var oZheng = getClass(document, 'zheng')[0];
  var oOn = getClass(document, 'on')[0];
  var oOff = getClass(document, 'off')[0];
  var oClea = getClass(document, 'clea')[0];
  var bOnOrOffClick = false;
  var errkey = false;

  function fnNum(a) {
    var bClear = false;
    oText.value = '0';
    for (var i = 0; i < aNum.length; i++) {
      aNum[i].onclick = function() {
        if (!bOnOrOffClick) return;
        if (bClear) {
          bClear = false;
        }if(errkey==true){
          errkey = false;
          oText.value = '0';
          return;
        }
        /*if (oText.value.indexOf('.') != -1) {
          if (this.innerHTML == '.') {
            return;
          }
        }*/
        var re = /\d+\.\d*$/;
        if(re.test(oText.value) && this.innerText == '.'){
          return;
        }
        var re2 = /[\+\-\*\/]+$/;
        if(re2.test(oText.value) && this.innerText == '.'){
          return;
        }
        /*if (oPer.value && oText.value && oText1.value == '') {
          oText1.value = oText.value;
          oText.value = '';
        }*/
        //var re = /^0\.{1}\d+\.{1}$/;
        var re1 = /^([0]\d+)$/;
        oText.value += this.innerHTML;

        /*if (re.test(oText.value)) {
          return;
        }*/

        if (re1.test(oText.value)) {
          oText.value = this.innerHTML;
        }
      }
      //符号部分的添加
      for (var j = 0; j < aPer.length; j++) {
        aPer[j].onclick = function() {
          if(errkey==true){
            errkey = false;
            oText.value = '0';
            return;
          }
          if(oText.value == '0'&& this.innerText == '('){
            oText.value = '(';
          }
          else{
            oText.value += this.innerText;
            //oText1.value = '';
          }
          //oPer.value = this.innerHTML;
        }

      }
      //点击等号的时候
      oDeng.onclick = function() {
        //+-*/%的情况
        if(errkey==true){
          errkey = false;
          oText.value = '0';
          return;
        }
        if (oText.value=='') {
          return;
        }
        try{
        var n = eval(oText.value).toString();
      }catch(err){
        alert("Error");
        errkey = true;
      }
        oText.value = n;
        bClear = false;
      }
      //点击delete的时候
      oSq.onclick = function() {
        if(errkey==true){
          errkey = false;
          oText.value = '0';
          return;
        }
        oText.value = oText.value.substring(0, oText.value.length-1);
      }

      //正负号的时候
      oZheng.onclick = function() {
        if(errkey==true){
          errkey = false;
          oText.value = '0';
          return;
        }
        if (oText.value > 0) {
          oText.value = -oText.value;
        } else {
          oText.value = -oText.value;
        }
      }
      //清屏的时候
      oClea.onclick = function() {
        if(bOnOrOffClick == false){
          return;
        }
        oText.value = '0';
        bClear = true;
      }
    }
  }
  //on时
  oOn.onclick = function() {
    bOnOrOffClick = true;
    fnNum(bOnOrOffClick);
  }

  //off时
  oOff.onclick = function() {
    bOnOrOffClick = false;
    fnNum(bOnOrOffClick);
    oText.value = '';
  }
}
