window.onload = function() {
  var oscore = document.getElementById('score-counter');
  var omole = document.getElementsByClassName('mole-circle');
  var ogo = document.getElementById('GO-box');
  var otime = document.getElementById('time-counter');
  var obutton = document.getElementById('button-ss');
  //var oclock = 0;
  var outMole = 0;
  var tempMole = 0;
  var isBegin = false;

  /*var myTimeInt = setInterval(function(){
    if(isBegin==false||oclock==0){
      clearInterval(myTimeInt);
    }else {
      oclock--;
      otime.value = oclock;
    }
  }, 1000);*/

  obutton.addEventListener("click", function(){
    if(isBegin==false){
      isBegin = true;
      oscore.value = 0;
      otime.value = 30;
      ogo.value = "";
      createMole();
      var myTimeInt = setInterval(function(){
        if(otime.value==0){
          clearInterval(myTimeInt);
          isBegin = false;
          ogo.value = "Game Over";
          omole[outMole].checked = false;
          alert("Your finally score is: " + oscore.value);
        }else {
          otime.value--;
        }
      }, 1000);
    }else{
      isBegin = false;
      omole[outMole].checked = false;
      clearInterval(myTimeInt);
      ogo.value = "Game Over";
      alert("not this");
      otime.value = 0;
      //alert("Your finally score is: " + oscore.value);
    }
  });

  function createMole(){
    while(tempMole==outMole){
      tempMole = randomNum();
    }outMole = tempMole;
    omole[outMole].checked = true;
  }


  for(var i = 0;i < omole.length;i++){
    (function(i){
      omole[i].addEventListener("click", function(){
        if(i!=outMole&&isBegin==true){
          if(oscore.value!=0){
            oscore.value--;
          }
          omole[i].checked = false;
        }
        else if(i==outMole&&isBegin==true){
          oscore.value++;
          createMole();
          omole[i].checked = false;
          //createMole();
        }else if(isBegin==false){
          omole[i].checked = false;
        }
      })
    })(i)
  }


  function randomNum(){
    return parseInt(Math.random()*60,10);
  }

}
