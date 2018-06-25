var xmlhttp = new XMLHttpRequest();
var check = [false, false, false, false, false];
var tempcheck = [false, false, false, false, false];
var random_arr = [];
var isShow = false;

window.onload = function() {
  smallbut = document.getElementsByClassName('button');
  obutton = document.getElementById('button');
  ounread = document.getElementsByClassName('unread');
  ocounter = document.getElementById('counter');
  infobar = document.getElementById('info-bar');
  atplus = document.getElementById('atplus');
  showorder = document.getElementById('showorder');

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

  atplus.addEventListener('click', function(){
    changearr();
    showOrder();
    getRandom(0);
  })

  function getRandom(i){
    if(i==5){
      ocounter.innerHTML = parseInt(ounread[0].innerHTML)+parseInt(ounread[1].innerHTML)+parseInt(ounread[2].innerHTML)+parseInt(ounread[3].innerHTML)+parseInt(ounread[4].innerHTML);
      infobar.className = '';
      return;
    }if(check[random_arr[i]]==true){
      return;
    }
    check[random_arr[i]] = true;
    overthrow1(random_arr[i]);
    ounread[random_arr[i]].className = 'unread inread';
    ounread[random_arr[i]].innerHTML = '...';
    xmlhttp.open("GET","getRandomNumber" ,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          ounread[random_arr[i]].innerHTML=xmlhttp.responseText;
          overthrow2(random_arr[i]);
          isBubbleValid();
          getRandom(i+1);
        }
    }
  }

  obutton.addEventListener("mouseleave", function(){
    counter.innerHTML = '';
    showorder.innerHTML = '';
    random_arr = [];
    infobar.className = '';
    isShow = false;
    for(var i = 0;i < 5;i++){
      smallbut[i].className = 'button';
      ounread[i].innerHTML = '';
      ounread[i].className = 'unread';
      check[i] = false;
    }
  })

  function showOrder(){
    var orderarr = [];
    for(var i = 0;i < 5;i++){
      orderarr[i] = (random_arr[i]+10).toString(16);
    }if(isShow==false){
      showorder.innerHTML = orderarr.join();
      isShow = true;
    }
  }



}

function changearr(){
  for(var i = 0;i < 5;i++){
    random_arr[i] = i;
  }
  random_arr.sort(function(){ return 0.5 - Math.random() });
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
