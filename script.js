//TODO (higher == more prio)
//change checkMap() and game over mechanic, if there are 16 tiles, simulate moves
//mobile support
//fix animation: for moving: put new box into the place from which animated box moved (what?)
//css
//popUpScore for highscore if its updated

class Box {
    constructor(movable, value){
        this.movable = movable;
        this.value = value;
    }
}

function makeBoxObjects(n) {
    var mapArr = new Array(n)
    for (var i = 0; i < n; ++i) { //i++ crashes, idk why
        mapArr[i] = new Box(true,0)
    }
    return mapArr;
}

var map = makeBoxObjects(16);
const arrW = [0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15];
const arrS = [15,11,7,3,14,10,6,2,13,9,5,1,12,8,4,0];
const arrA = [12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3]; // L > P
const arrD = [3,2,1,0,7,6,5,4,11,10,9,8,15,14,13,12]; // P > L
var mapState = [];
var firstUpdate = true;
var currScore = 0;
var turnScore = 0;
var canMove = false;
var firstMove = null;
var lastMove = null;

function wynik(){//count score
    if(localStorage.getItem("highscore"))
    {
        var bestSuma = localStorage.getItem("highscore");
    }else {bestSuma = 0}

    if(localStorage.getItem("currScore"))
    {
        currScore = JSON.parse(localStorage.getItem("currScore"));
    }else {currScore = 0}
    
    if(currScore > bestSuma){
        localStorage.setItem("highscore",currScore);
        bestSuma = currScore;
    }
    return {
        'score':currScore,
        'highscore':bestSuma
    };
}

function checkSave(){
    if(!localStorage.mapState) return update();

    map = JSON.parse(localStorage.mapState);  
    firstUpdate = false;
    let scoreCount = document.getElementById("scoreNow");
    let scoreHigh = document.getElementById("scoreBest");
    let scores = wynik();
    scoreCount.innerText = scores.score;
    scoreHigh.innerText = scores.highscore;
    getValue();
    return 0;
}

function update(){ //update map
    let scoreCount = document.getElementById("scoreNow");
    let scoreHigh = document.getElementById("scoreBest");
    let rand1 = Math.floor(Math.random() * (16 - 0));
    let rand2 = Math.floor(Math.random() * (16 - 0));
    if(map[rand1].value != 0 || map[rand2].value != 0){
        let check = checkMap();
        if(check == 0){
            document.getElementById("overlay").style.display = "block";
            return;
        }
        return update();
    }
    
    if(firstUpdate == true){ 
        let box1 = document.getElementById(rand1);
        let box2 = document.getElementById(rand2);
        if(box2 == box1){
            return update();
        }else{
            map[rand1].value = 3;
            map[rand2].value = 3;
            let scores = wynik();
            scoreCount.innerText = scores.score;
            scoreHigh.innerText = scores.highscore;
            animate(rand1,rand2)
            mapState = [];
            mapState = [...map];
            localStorage.setItem("mapState",JSON.stringify(mapState));
            firstUpdate = false;
            return getValue(), checkMap();
        }
    }

    console.log("Update: ",canMove);
    if(canMove == false) {
        getValue();
        return 0;
    }

    let rand = Math.floor(Math.random() * (16 - 0));
        if(map[rand].value == 0){
            map[rand].value = 3;
            let scores = wynik();
            scoreCount.innerText = scores.score;
            scoreHigh.innerText = scores.highscore;
            animate(rand);
            mapState = [];
            mapState = [...map];
            localStorage.setItem("mapState",JSON.stringify(mapState));
            canMove = false; 
            console.log("UpdateEnd: ", canMove)
            return getValue(), checkMap();
        }else {return update()}

       
}

document.addEventListener("keydown", function(e) {  //site doesnt scroll with that
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
});

document.addEventListener("touchmove", function(e) { 
    e.preventDefault();
});

document.addEventListener("keydown",function (event){ //take input and modify map accordingly
    move(event);
}); 

document.addEventListener("touchstart", function(e){
    //var x = e.touches[0].clientX;
    //var y = e.touches[0].clientY;
    firstMove = e;
    //console.log("Start: ",x,y)
}, false);

document.addEventListener("touchend", function(e){
    //var x = e.changedTouches[0].clientX;
    //var y = e.changedTouches[0].clientY;
    lastEndMove = e;
    var result = checkMobileMove();
    move(result);
    //console.log("End: ",x,y)
}, false);

const checkMobileMove = () => {
    XDiff = Math.abs(firstMove.touches[0].clientX - lastEndMove.changedTouches[0].clientX);
    YDiff = Math.abs(firstMove.touches[0].clientY - lastEndMove.changedTouches[0].clientY);

    if(YDiff > XDiff){
        if(firstMove.touches[0].clientY < lastEndMove.changedTouches[0].clientY){
            console.log("Palec w dol")
            const a = {code:"KeyS"}
            return a;
        }
        if(firstMove.touches[0].clientY > lastEndMove.changedTouches[0].clientY){
            console.log("Palec w gore")
            const a = {code:"KeyW"}
            return a;
        }
    }

    if(XDiff > YDiff){
        if(firstMove.touches[0].clientX < lastEndMove.changedTouches[0].clientX){
            console.log("Palec w prawo")
            const a = {code:"KeyD"}
            return a;
        }
        if(firstMove.touches[0].clientX > lastEndMove.changedTouches[0].clientX){
            console.log("Palec w lewo")
            const a = {code:"KeyA"}
            return a;
        }
    }
}

function move(event){
    switch(event.code) {                                      //1st check if same powers,then check if empty,
        case "KeyS":                                          //also check its movable property
        case "ArrowDown":
            arrS.forEach(e => {
                if(map[e].value > 0){
                    if(e <= 11){
                        if(map[e].value == map[e+4].value && map[e+4].movable == true){
                            map[e+4].value = map[e+4].value*3;
                            currScore += map[e+4].value;
                            turnScore += map[e+4].value;
                            moveBox(e, "down", 0); //default 1
                            map[e+4].movable = false; 
                            map[e].value = 0;
                            canMove = true;
                            console.log("moveDownOne", canMove);
                        }
                        if(e <= 7){
                            if(map[e].value == map[e+8].value & map[e+4].value == 0 && map[e+8].movable == true){
                                map[e+8].value = map[e+8].value*3; 
                                currScore += map[e+8].value;
                                turnScore += map[e+8].value;
                                moveBox(e, "down", 1); //default 2
                                map[e+8].movable = false;
                                map[e].value = 0;
                                canMove = true;
                                console.log("moveDownTwo", canMove);
                            }
                            if(e <=3 ){
                                if(map[e].value == map[e+12].value && map[e+8].value == 0 & map[e+4].value == 0 && map[e+12].movable == true){
                                    map[e+12].value = map[e+12].value*3; 
                                    currScore += map[e+12].value;
                                    turnScore += map[e+12].value;
                                    moveBox(e, "down", 2); //default 3
                                    map[e+12].movable = false;
                                    map[e].value = 0;
                                    canMove = true;
                                    console.log("moveDownThree", canMove);
                                }
                            }
                        }
                    }
                }
            });
            for(let x = 0; x < 3; x++){
                for(let i = 0; i <= map.length - 1; i++){  
                    if(map[i].value > 0){
                        if(i <= 11){
                            if(map[i].value != map[i+4].value){
                                console.log("idk", i);
                                //canMove = false;
                            }
                            if(map[i+4].value == 0){
                                map[i+4].value = map[i].value;
                                moveBox(i, "down", 1);
                                map[i].value = 0;   
                                console.log("move", i);
                                canMove = true;
                            }
                        }  
                    }
                }
            }
            map.forEach(x => {
                x.movable = true;
            });
            localStorage.setItem("currScore", JSON.stringify(currScore));
            popUpScore(turnScore);
            turnScore = 0;
            return update();
        case "KeyW":
        case "ArrowUp":
            console.log(event.code)
            arrW.forEach(e => {
                if(map[e].value > 0){
                    if(e >= 4){
                        if(map[e].value == map[e-4].value &&  map[e-4].movable == true){
                            map[e-4].value = map[e-4].value*3;
                            currScore += map[e-4].value;
                            turnScore += map[e-4].value;
                            moveBox(e, "up", 1);
                            map[e-4].movable = false; 
                            map[e].value = 0;
                            canMove = true;
                        }
                        if(e >= 8){
                            if(map[e].value == map[e-8].value & map[e-4].value == 0 && map[e-8].movable == true){
                                map[e-8].value = map[e-8].value*3; 
                                currScore += map[e-8].value;
                                turnScore += map[e-8].value;
                                moveBox(e, "up", 2);
                                map[e-8].movable = false;
                                map[e].value = 0;
                                canMove = true;
                            }
                            if(e >= 12){
                                if(map[e].value == map[e-12].value && map[e-8].value == 0 & map[e-4].value == 0 && map[e-12].movable == true){
                                    map[e-12].value = map[e-12].value*3; 
                                    currScore += map[e-12].value;
                                    turnScore += map[e-12].value;
                                    moveBox(e, "up", 3);
                                    map[e-12].movable = false;
                                    map[e].value = 0;
                                    canMove = true;
                                }
                            }
                        }
                    }
                }
            });
            for(let x = 0; x < 3; x++){
                for(let i = 15; i >= 0; i--){  
                    if(map[i].value > 0){
                        if(i >= 4){
                            if(map[i] != map[i-4]){
                                console.log("idk");
                                //canMove = false;
                            }
                            if(map[i-4].value == 0){
                                map[i-4].value = map[i].value;
                                moveBox(i, "up", 1);
                                map[i].value = 0;   
                                canMove = true;
                            } 
                        }  
                    }
                }
            }
            map.forEach(x => {
                x.movable = true;
            });
            localStorage.setItem("currScore", JSON.stringify(currScore));
            popUpScore(turnScore);
            turnScore = 0;
            return update();
        case "KeyA":
        case "ArrowLeft":
            console.log(event.code)
            arrA.forEach(e => {
                if(map[e].value > 0){
                    if(e != 0 && e != 4 && e != 8 && e != 12){
                        if(map[e].value == map[e-1].value && map[e-1].movable == true){
                            map[e-1].value = map[e-1].value*3; 
                            currScore += map[e-1].value;
                            turnScore += map[e-1].value;
                            moveBox(e, "left", 1);
                            map[e-1].movable = false;
                            map[e].value = 0;
                            canMove = true;
                        }
                        if(e != 1 && e != 5 && e != 9 && e != 13){
                            if(map[e].value == map[e-2].value & map[e-1].value == 0 && map[e-2].movable == true){
                                map[e-2].value = map[e-2].value*3; 
                                currScore += map[e-2].value;
                                turnScore += map[e-2].value;
                                moveBox(e, "left", 2);
                                map[e-2].movable = false;
                                map[e].value = 0;
                                canMove = true;
                            }
                            if(e != 2 && e != 6 && e != 10 && e != 14){
                                if(map[e].value == map[e-3].value & map[e-2].value == 0 & map[e-1].value == 0 && map[e-3].movable == true){
                                    map[e-3].value = map[e-3].value*3; 
                                    currScore += map[e-3].value;
                                    turnScore += map[e-3].value;
                                    moveBox(e, "left", 3);
                                    map[e-3].movable = false;
                                    map[e].value = 0;
                                    canMove = true;
                                }
                            }
                        }
                    }      
                }
            });
            for(let x = 0; x < 3; x++){
                for(let i = 15; i >= 0; i--){  
                    if(i != 0 && i != 4 && i != 8 && i != 12){
                        if(map[i].value > 0){
                            if(map[i].value != map[i-1].value){
                                console.log("idk");
                                //canMove = false;
                            }
                            if(map[i-1].value == 0){
                                map[i-1].value = map[i].value;
                                moveBox(i, "left", 1);
                                map[i].value = 0;     
                                canMove = true;
                            }  
                        }  
                    }
                }
            }
            map.forEach(x => {
                x.movable = true;
            });
            localStorage.setItem("currScore", JSON.stringify(currScore));
            popUpScore(turnScore);
            turnScore = 0;
            return update();
        case "KeyD":
        case "ArrowRight":
            console.log(event.code)
            arrD.forEach(e => {
                if(map[e].value > 0){
                    if(e != 3 && e != 7 && e != 11 && e != 15){
                        if(map[e].value == map[e+1].value && map[e+1].movable == true){
                            map[e+1].value = map[e+1].value*3; 
                            currScore += map[e+1].value;
                            turnScore += map[e+1].value;
                            moveBox(e, "right", 1);
                            map[e+1].movable = false;
                            map[e].value = 0;
                            canMove = true;
                        }
                        if(e != 2 && e != 6 && e != 10 && e != 14){
                            if(map[e].value == map[e+2].value & map[e+1].value == 0 && map[e+2].movable == true){
                                map[e+2].value = map[e+2].value*3; 
                                currScore += map[e+2].value;
                                turnScore += map[e+2].value;
                                moveBox(e, "right", 2);
                                map[e+2].movable = false;
                                map[e].value = 0;
                                canMove = true;
                            }
                            if(e != 1 && e != 5 && e != 9 && e != 13){
                                if(map[e].value == map[e+3].value & map[e+2].value == 0 & map[e+1].value == 0 && map[e+3].movable == true){
                                    map[e+3].value = map[e+3].value*3;
                                    currScore += map[e+3].value;
                                    turnScore += map[e+3].value;
                                    moveBox(e, "right", 3);
                                    map[e+3].movable = false;
                                    map[e].value = 0;
                                    canMove = true;
                                }
                            }
                        }
                    } 
                }
            });
            for(let x = 0; x < 3; x++){
                for(let i = 0; i <= map.length - 1; i++){  
                    if(i != 3 && i != 7 && i != 11 && i != 15){
                        if(map[i].value > 0){
                            if(map[i].value != map[i+1].value){
                                console.log("idk");
                                //canMove = false;
                            }
                            if(map[i+1].value == 0){
                                map[i+1].value = map[i].value;
                                moveBox(i, "right", 1);
                                map[i].value = 0;    
                                canMove = true; 
                            }
                        }  
                    }
                }
            }
            map.forEach(x => {
                x.movable = true;
            });
            localStorage.setItem("currScore", JSON.stringify(currScore));
            popUpScore(turnScore);
            turnScore = 0;
            return update(); 
        }
}

function checkMap(){ //check if there are empy spaces on map
    let i = 0;
    map.forEach(e => {
        if(e.value > 0){
            i++;
        }
    });
    if(i > 15){
        console.error("Game Over")
        localStorage.setItem("mapState",JSON.stringify([]));
        return 0;
    }
    return 1;
}

function getValue(){ //get value from map[] and put it into box
    for(let e = 0; e<map.length;e++){
        let box = document.getElementById(e);
        switch (map[e].value) {
            case 0:
                box.style.backgroundColor = "#cdc1b4";
                break;
            case 3:
                box.style.backgroundColor = "#eee4da";
                box.style.color = "#776e65";
                break;
            case 9:
                box.style.backgroundColor = "#eee1c9";
                box.style.color = "#776e65";
                break;
            case 27:
                box.style.backgroundColor = "#f3b27a";
                box.style.color = "#f9f6f2"
                break;
            case 81:
                box.style.backgroundColor = "#f69664";
                box.style.color = "#f9f6f2"
                break;
            case 243:
                box.style.backgroundColor = "#f67c5f";
                box.style.color = "#f9f6f2"
                break;
            case 729:
                box.style.backgroundColor = "#f65e3b";
                box.style.color = "#f9f6f2"
                break;
            case 2187:
                box.style.backgroundColor = "#edcf72";
                box.style.color = "#f9f6f2"
                break;
            case 6561:
                box.style.backgroundColor = "#edcc61";
                box.style.color = "#f9f6f2"
                break;
            case 19683:
                box.style.backgroundColor = "#edc850";
                box.style.color = "#f9f6f2"
                break;
            case 59049:
                box.style.backgroundColor = "#edc53f";
                box.style.color = "#f9f6f2"
                break;
            case 177147:
                box.style.backgroundColor = "#edc22e";
                box.style.color = "#f9f6f2"
                break;
        }

        if(map[e].value > 0){ 
            box.innerText = map[e].value;
        }else{
            box.innerText = " ";
        }
    }
}
/*
#edcc61 256
#edc850 512
#edc53f 1024
#edc22e 2048
#3c3a32 4096
#3c3a32 8192 (make it darker)
*/

function reset(){
    document.getElementById("overlay").style.display = "none";
    map = makeBoxObjects(16);
    getValue();
    localStorage.setItem("mapState", []);
    localStorage.setItem("currScore", 0);
    firstUpdate = true;
    currScore = 0;
    canMove = true;
    return update();
}

function scrollTop(){
    window.scrollTo({
        top:0,
        behavior: "smooth"
    })
}

function scrollBot(){
    document.getElementById("explain").className = "explain_highlight";
    setTimeout(function(){
        document.getElementById("explain").className = "explain_default";
    }, 3200)
    window.scrollTo({
        top: 1000,//document.body.scrollHeight,
        behavior: "smooth"
    })
}

function platforms() {
    alert("There is no version for mobile devices");
    return 0;
}

function animate(id1,id2 = id1){
    if(arguments.length == 1){
        let box1 = document.getElementById(id1);
        box1.className = "td_animate";
        setTimeout(function(){
            box1.classList.remove("td_animate");
        }, 400)
    }
    let box1 = document.getElementById(id1);
    let box2 = document.getElementById(id2);
    box1.className = "td_animate";
    box2.className = "td_animate";
    setTimeout(function(){
        box1.classList.remove("td_animate");
        box2.classList.remove("td_animate");
    }, 400)
}

function popUpScore(score){
    if(score > 0){
        let pop = document.getElementById("scorePopUp");
        pop.innerHTML = `+${score}`;
        pop.className = "scorePopUp_animate";
        setTimeout(function(){
            pop.className = "scorePopUp";
        }, 600)
    }
}

function moveBox(id, direction, multiplier){
    let box = document.getElementById(id);
    const a_time = {
        duration: 100, //default 100
    }

    if(map[id].value > 0){
        switch (direction) {
            case "up":
            if(id > 3){
                t = (-160) * multiplier;
                var a = [
                    {transform: `translate(0px,${t}px)`}
                ]
            }    
            box.animate(a, a_time); 
                break;
            case "down":
            if(id < 12){
                t = 160 * multiplier;
                var a = [
                    {transform: `translate(0px,${t}px)`}
                ]
            }
            box.animate(a, a_time);
                break;
            case "left":
            if(id != 0 && id != 4 && id != 8 && id != 12){
                t = (-160) * multiplier;
                var a = [
                    {transform: `translate(${t}px)`}
                ]
            }    
            box.animate(a, a_time);     
                break;
            case "right":
            if(id != 3 && id != 7 && id != 11 && id != 15){
                t = 160 * multiplier;
                var a = [
                    {transform: `translate(${t}px)`}
                ]
            }    
            box.animate(a, a_time);       
                break;
            default:
                break;
        }
    }
}

const debugMap = () =>{
    console.log(
        "|" + map[0].value + "|" + map[1].value + "|" + map[2].value + "|" + map[3].value+ "|\n" +
        " " + "-" + " " + "-" + " " + "-" + " " + "-\n" +
        "|" + map[4].value + "|" + map[5].value + "|" + map[6].value + "|" + map[7].value + "|\n" +
        " " + "-" + " " + "-" + " " + "-" + " " + "-\n" +
        "|" + map[8].value + "|" + map[9].value + "|" + map[10].value + "|" + map[11].value + "|\n" +
        " " + "-" + " " + "-" + " " + "-" + " " + "-\n" +
        "|" + map[12].value + "|" + map[13].value + "|" + map[14].value + "|" + map[15].value + "|\n" +
        " " + "-" + " " + "-" + " " + "-" + " " + "-" 
    )
}