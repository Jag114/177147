//TODO
//add animations: 2.for moving
//mobile support
//update for 1 box need to check its near boxes whether they are empty or not
//css
//change score counting
//change checkMap() 
//add do nothing if there is nothing to do, i.e. dont spawn new boxes

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

var mapOld = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const arrW = [0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15];
const arrS = [15,11,7,3,14,10,6,2,13,9,5,1,12,8,4,0];
const arrA = [12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3]; // L > P
const arrD = [3,2,1,0,7,6,5,4,11,10,9,8,15,14,13,12]; // P > L
var mapState = [];
var firstUpdate = true;
var count = 0;

function wynik(){//count score
    let suma = 0;
    let bestSuma = localStorage.getItem("highscore");
    //map.forEach(e => {
    //        suma += e;
    //})
    if(suma > bestSuma){
        localStorage.setItem("highscore",suma);
        bestSuma = suma;
    }
    return {
        'score':suma,
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

function update(){ //generate,update map

    let scoreCount = document.getElementById("scoreNow");
    let scoreHigh = document.getElementById("scoreBest");
    let rand1 = Math.floor(Math.random() * (16 - 0));
    let rand2 = Math.floor(Math.random() * (16 - 0));
    //console.log("Update2: ",rand1, rand2)
    if(map[rand1].value != 0 || map[rand2].value != 0){
        //console.log("Check map")
        let check = checkMap();
        if(check == 0){
            const gameOverDiv = document.createElement("div");
            const gameOverContent = document.createTextNode("Game Over");
            gameOverDiv.appendChild(gameOverContent);
            document.body.replaceChildren(gameOverDiv);
            return;
        }
        return update();
    }
    
    if(firstUpdate == true){ 
        //console.log("First update, start")
        let box1 = document.getElementById(rand1);
        let box2 = document.getElementById(rand2);
        if(box2 == box1){
            return update();
        }else{
            map[rand1].value = 3;
            map[rand2].value = 3;
            let scores = wynik();
            //console.log("First update, score", scores.score, scores.highscore)
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
    //console.log("Nth update start")
    let rand = Math.floor(Math.random() * (16 - 0));
        //console.log("Update: ",rand)
        if(map[rand].value == 0){
            //console.log("Nth update, check if empty")
            map[rand].value = 3;
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
            let scores = wynik();
            //console.log("Nth update, score", scores.score, scores.highscore)
            scoreCount.innerText = scores.score;
            scoreHigh.innerText = scores.highscore;
            animate(rand);
            mapState = [];
            mapState = [...map];
            localStorage.setItem("mapState",JSON.stringify(mapState));
            return getValue(), checkMap();
        }else {return update()}

       
}

document.addEventListener("keydown",function move(event){ //take input and modify map accordingly
switch(event.code) {                                      // 1st check if same powers,then check if empty
    case "KeyS":
    case "ArrowDown":
        console.log(event.code)
        arrS.forEach(e => {
            if(e <= 11){
                if(map[e].value == map[e+4].value){
                    map[e+4].value = map[e+4].value*3;
                    map[e+4].movable = false; 
                    map[e].value = 0;
                }
                if(e <= 7){
                    if(map[e].value == map[e+8].value & map[e+4].value == 0 && map[e+8].movable == true){
                        map[e+8].value = map[e+8].value*3; 
                        map[e+8].movable = false;
                        map[e].value = 0;
                    }
                    if(e <=3 ){
                        if(map[e].value == map[e+12].value && map[e+8].value == 0 & map[e+4].value == 0 && map[e+12].movable == true){
                            map[e+12].value = map[e+12].value*3; 
                            map[e+12].movable = false;
                            map[e].value = 0;
                        }
                    }
                }
            }
        });
        for(let x = 0; x < 3; x++){
            for(let i = 0; i <= map.length - 1; i++){  
                if(map[i].value > 0){
                    if(i <= 11){
                        if(map[i+4].value == 0){
                            map[i+4].value = map[i].value;
                            map[i].value = 0;   
                        }
                        if(map[i] != map[i+4]){
                            console.log("idk");
                        }
                    }  
                }
            }
        }
        map.forEach(x => {
            x.movable = true;
        });
        return update();
    case "KeyW":
    case "ArrowUp":
        console.log(event.code)
        arrW.forEach(e => {
            if(map[e] == map[e-12] && map[e-8] == 0 & map[e-4] == 0){
                map[e-12] = map[e-12]*3; 
                map[e]=0;
            }
            if(map[e] == map[e-8] & map[e-4] == 0){
                map[e-8] = map[e-8]*3; 
                map[e]=0;
            }
            if(map[e] == map[e-4]){
                map[e-4] = map[e-4]*3; 
                map[e]=0;
            }
        });
        for(let x = 0; x < 3; x++){
            for(let i = 15; i >= 0; i--){  
                if(map[i] > 0){
    
                    if(map[i-4] == 0){
                        map[i-4] = map[i];
                        map[i] = 0;   
                    }
                    if(map[i] != map[i-4]){
                        console.log("idk");
                    }
                }
            }
        }
        return update();
    case "KeyA":
    case "ArrowLeft":
        console.log(event.code)
        arrA.forEach(e => {
            if(e != 4 && e != 8 && e != 12){
                if(map[e] == map[e-1]){
                    map[e-1] = map[e-1]*3; 
                    map[e]=0;
                }
                if(e != 5 && e != 9 && e != 13){
                    if(map[e] == map[e-2] & map[e-1] == 0){
                        map[e-2] = map[e-2]*3; 
                        map[e]=0;
                    }
                    if(e != 6 && e != 10 && e != 14){
                        if(map[e] == map[e-3] & map[e-2] == 0 & map[e-1] == 0){
                            map[e-3] = map[e-3]*3; 
                            map[e]=0;
                        }
                    }
                }
            }      
        });
        for(let x = 0; x < 3; x++){
            for(let i = 15; i >= 0; i--){  
                if(i != 0 && i != 4 && i != 8 && i != 12){
                    if(map[i] > 0){
                        if(map[i-1] == 0){
                            map[i-1] = map[i];
                            map[i] = 0;     
                        }
                        if(map[i] != map[i-1]){
                            console.log("idk");
                        }
                    }  
                }
            }
        }
        return update();
    case "KeyD":
    case "ArrowRight":
        console.log(event.code)
        arrD.forEach(e => {
            if(e != 3 && e != 7 && e != 11){
                if(map[e] == map[e+1]){
                    map[e+1] = map[e+1]*3; 
                    map[e]=0;
                }
                if(e != 2 && e != 6 && e != 10){
                    if(map[e] == map[e+2] & map[e+1] == 0){
                        map[e+2] = map[e+2]*3; 
                        map[e]=0;
                    }
                    if(e != 1 && e != 5 && e != 9){
                        if(map[e] == map[e+3] & map[e+2] == 0 & map[e+1] == 0){
                            map[e+3] = map[e+3]*3; 
                            map[e]=0;
                        }
                    }
                }
            }
            
            
        });
        for(let x = 0; x < 3; x++){
            for(let i = 0; i <= map.length; i++){  
                if(i != 3 && i != 7 && i != 11 && i != 15){
                    if(map[i] > 0){
                        if(map[i+1] == 0){
                            map[i+1] = map[i];
                            map[i] = 0;     
                        } 
                        if(map[i] != map[i+1]){
                            console.log("idk");
                        }
                    }  
                }
            }
        }
        return update();
    }

});

window.addEventListener("keydown", function(e) {  //site doesnt scroll with that
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
});

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
    map.fill(0);
    getValue();
    localStorage.setItem("mapState", []);
    firstUpdate = true;
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
        box1.className = "box_animate";
        setTimeout(function(){
            box1.className = "box";
        }, 400)
    }
    let box1 = document.getElementById(id1);
    let box2 = document.getElementById(id2);
    box1.className = "box_animate";
    box2.className = "box_animate";
    setTimeout(function(){
        box1.className = "box";
        box2.className = "box";
    }, 400)
}