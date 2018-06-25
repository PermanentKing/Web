var flag = 0;
window.onload=function(){
    document.getElementById("start").addEventListener("click", random_pos);
    document.getElementById("change").addEventListener("click", change_picture);
    create_picture();
}
var change_number = 0;
function change_picture(event){
    change_number++;
    change_number%=3;
    // if(change_number > 2){
    //     change_number = 0;
    // }
    for(var i=0;i<16;i++){
        var str= picture.childNodes[i].className;
        str = str.substring(13);
        picture.childNodes[i].className = "picture_part"+change_number+str;
    }
    //create_picture();
    recovery.className = "recovery" + change_number;
}
function create_picture() {
    flag = 0;
    picture = document.getElementById("picture");
    for (var i = 1; i <= 16; i++) {
        var part = document.createElement("div");
        part.addEventListener("click", picture_move);
        part.className = "picture_part" + change_number + " picture_"+i;
        picture.appendChild(part);
        part.id = "_picture_"+i;
    }
    recovery = document.getElementById("recovery");
    recovery.className = "recovery0";
}
function check(){
    var count = 0;
    for(var i=0;i<16;i++){
        for(var j=i+1;j<16;j++){
            if(random_arr[i]>random_arr[j]){
                count++;
            }
        }
    }
    return count%2===0;
}
function random_pos(event){
    document.getElementById("result").innerText = "";
    for (var k = 1; k <= 16; k++) {
        document.getElementById("_picture_"+k).className="picture_part"+change_number+" picture_"+k;
    }
    var part = document.getElementById("picture");
    random_arr = [];
    for (var j = 0; j < 15; j++) {
        random_arr[j] = j+1;
    }
    function cmp() { return 0.5-Math.random(); }
    while(1) {
        random_arr.sort(cmp);
        if (check()) {
            break;
        }
    }
    for (var i = 0; i < 15; i++) {
        part.childNodes[i].className = "picture_part" + change_number + " picture_" + random_arr[i];
    }
    flag = 1;
}
function picture_move(event){
    var blank = document.getElementById("_picture_16");
    var blank_left = blank.offsetLeft;
    var blank_top = blank.offsetTop;
    var left = this.offsetLeft;
    var top = this.offsetTop;
    if(flag==1){
        if((Math.abs(blank_left-left)==85 && blank_top==top) || (Math.abs(blank_top-top)==85 && blank_left==left)){
            var str = blank.className;
            blank.className = this.className;
            this.className = str;
            if_complete();
        } 
    }
}
function if_complete(){
    for(var i=1; i<=16; i++){
        var each_part = document.getElementById("_picture_"+i);
        if(each_part.className!="picture_part"+ change_number +" picture_"+i){
            document.getElementById("result").innerText = "Continuing...";
            return;
        }
    }
    document.getElementById("result").innerText = "You win!";
}
