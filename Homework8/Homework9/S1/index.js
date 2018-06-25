var xmlhttp = new XMLHttpRequest();
var check = [false, false, false, false, false];
var tempcheck = [false, false, false, false, false];

window.onload = function() {
  smallbut = document.getElementsByClassName('button');
  obutton = document.getElementById('button');
  ounread = document.getElementsByClassName('unread');
  ocounter = document.getElementById('counter');
  infobar = document.getElementById('info-bar');

  infobar.addEventListener("click", function() {
    if(isBubbleValid()){
      ocounter.innerHTML = parseInt(ounread[0].innerHTML) + parseInt(ounread[1].innerHTML) + parseInt(ounread[2].innerHTML) + parseInt(ounread[3].innerHTML) + parseInt(ounread[4].innerHTML);
      infobar.className = '';
    }
  })

  for (var i = 0; i < 5; i++) {
    (function(i) {
      smallbut[i].addEventListener("click", function() {
        if(check[i]==true){
          return;
        }
        check[i] = true;
        overthrow1(i);
        ounread[i].className = 'unread inread';
        ounread[i].innerHTML = '...';
        xmlhttp.open("GET", "getRandomNumber", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            ounread[i].innerHTML = xmlhttp.responseText;
            overthrow2(i);
            isBubbleValid();
          }
        }
      })
    }(i))
  }



  obutton.addEventListener("mouseleave", function() {
    xmlhttp = new XMLHttpRequest();
    counter.innerHTML = '';
    infobar.className = '';
    for (var i = 0; i < 5; i++) {
      ounread[i].innerHTML = '';
      ounread[i].className = 'unread';
      smallbut[i].className = 'button';
      check[i] = false;
      tempcheck[i] = false;
    }
  })


}

function isBubbleValid(){
  var temp = false;
  for(var i = 0;i < 5;i++){
    if(check[i]==false){
      temp = false;
      break;
    }else{
      temp = true;
    }
  }if(temp==true){
    infobar.className = 'infochecked';
  }
  return temp;
}


function overthrow1(j){
  for(var i = 0;i < 5;i++){
    if(check[i]==false&&i!=j){
      tempcheck[i] = true;
      check[i] = true;
      smallbut[i].className = 'button checked';
    }
  }
}


function overthrow2(j){
  for(var i = 0;i < 5;i++){
    if(tempcheck[i]==true){
      check[i] = false;
      smallbut[i].className = 'button';
    }
    tempcheck[i] = false;
  }smallbut[j].className = 'button checked';
}
