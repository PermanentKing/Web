/*var isBegin = false;
var isLose = false;
var isInContain = false;
var allWalls = document.getElementsByClassName('maze-wall');
var mybegin = document.getElementById('maze-middle-S');
var end = document.getElementById('maze-middle-E');*/

window.onload = function(){
  var isBegin = false;
  var isLose = false;
  var isInContain = true;
  var allWalls = document.getElementsByClassName('maze-wall');
  var mybegin = document.getElementById('maze-middle-S');
  var myend = document.getElementById('maze-middle-E');
  var mazeContainer = document.getElementById('maze-container');
  var oresult = document.getElementById('output-result');
  mybegin.onmouseover = function(){
    isBegin = true;
    isLose = false;
    isInContain = true;
    oresult.innerText = "";
  }
  myend.onmouseover = function (){
    if(isLose==false&&isBegin==true&&isInContain==true){
      oresult.innerText = "You Win!";
      isBegin = false;
    }else if(isLose==false&&isBegin==true&&isInContain==false){
      oresult.innerText = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
    }
  }

  mazeContainer.addEventListener("mouseleave", function(){
    if(isBegin==true){
      isInContain = false;
      //isBegin = false;
    }
  }, false);

  mazeContainer.addEventListener("mouseenter", function(){
    if(isBegin==true){
      isInContain = true;
    }
  }, false);

  for(var i = 0;i < allWalls.length;i++){
    (function(i){
      allWalls[i].addEventListener("mouseover", function(){
        if(isBegin==true&&isLose==false){
          allWalls[i].className += ' maze-wall-red';
          isLose = true;
          isBegin = false;
          oresult.innerText = "You Lose!";
        }
      });
    })(i);
  }
  for(var i = 0;i < allWalls.length;i++){
    (function(i){
      allWalls[i].addEventListener("mouseout", function(){
        allWalls[i].className = 'maze-wall';
      })
    })(i);
  }
}
