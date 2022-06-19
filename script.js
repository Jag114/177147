//TODO
//add animations: 2.for moving
//mobile support
//update for 1 box need to check its near boxes whether they are empty or not
//css
//change score counting
//change checkMap() 
//add do nothing if there is nothing to do, i.e. dont spawn new boxes
//map = [27,0,0,0,9,0,0,0,3,0,0,0,3,0,0,0] ArrowDown nie dziala jak powinno, jesli mozliwe

class Box {
    constructor(movable, value){
        this.movable = movable;
        this.value = value;
    }
}
let boxObj = new Box(true,0);
boxObj.value = 3;
boxObj.movable = false;
console.log(boxObj.value, boxObj.movable)
function makeBoxObjects(n) {
    var boxObjects = new Array(n)
    for (var i = 0; i < n; ++i) { //i++ crashes, idk why
        boxObjects[i] = new Box(true,0)
    }
    return boxObjects
}
let a = makeBoxObjects(16);
a[2].value = 3;
console.log(a);



var map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const arrW = [0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15];
const arrS = [15,11,7,3,14,10,6,2,13,9,5,1,12,8,4,0];
const arrA = [12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3]; // L > P
const arrD = [3,2,1,0,7,6,5,4,11,10,9,8,15,14,13,12]; // P > L
var mapState = [];
var firstUpdate = true;
var count = 0; //?


function wynik(){//count score
    var suma = 0;
    for (let i = 0; i < map.length; i++) {
        suma += map[i];
    }
    return suma;
}

function update(){ //generate,update map

    let rand1 = Math.floor(Math.random() * (16 - 0));
    let rand2 = Math.floor(Math.random() * (16 - 0));
    console.log("Update2: ",rand1, rand2)
    if(map[rand1] != 0 || map[rand2] != 0){
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

    if(wynik()>6){
        let rand = Math.floor(Math.random() * (16 - 0));
        console.log("Update: ",rand)
        if(map[rand] == 0){
            map[rand] = 3;
            console.table("Wynik > 6: ",wynik());
            return getValue(), checkMap();
        }
    }

        let box1 = document.getElementById(rand1);
        let box2 = document.getElementById(rand2);
        if(box2 == box1){
            return update();
        }else{
            map[rand1] = 3;
            map[rand2] = 3;
            console.table("Wynik < 6: ",wynik());
            return getValue(), checkMap();
        }
    
}

document.addEventListener("keydown",function move(event){ //take input and modify map accordingly
switch(event.code) {
    case "KeyS":
    case "ArrowDown":
        for(let i = 15; i >= 0; i--){  
            if(map[i] > 0){

                if(map[i+4] == 0){
                    map[i+4] = map[i];
                    map[i] = 0;   
                }

                if(map[i] == map[i+4]){
                    //console.log("Power")
                    map[i+4] = map[i+4]*3; 
                    map[i]=0;
                }

                if(map[i] != map[i+4]){
                    //idk
                }
            }
        }
        return update();
    case "KeyW":
    case "ArrowUp":
        for(let i = 0; i <= map.length; i++){  
            if(map[i] > 0){

                if(map[i-4] == 0){
                    map[i-4] = map[i];
                    map[i] = 0;   
                }

                if(map[i] == map[i-4]){
                    //console.log("Power")
                    map[i-4] = map[i-4]*3; 
                    map[i]=0;
                }

                if(map[i] != map[i-4]){
                    //idk
                }
            }
        }
        return update();
    case "KeyA":
    case "ArrowLeft":
        for(let i = 15; i >= 0; i--){  
            if(map[i] > 0){

                if(map[i+4] == 0){
                    map[i+4] = map[i];
                    map[i] = 0;   
                }

                if(map[i] == map[i+4]){
                    //console.log("Power")
                    map[i+4] = map[i+4]*3; 
                    map[i]=0;
                }

                if(map[i] != map[i+4]){
                    //idk
                }
            }
        }
        return update();
    case "KeyD":
    case "ArrowRight":
        for(let i = 15; i >= 0; i--){  
            if(map[i] > 0){

                if(map[i+4] == 0){
                    map[i+4] = map[i];
                    map[i] = 0;   
                }

                if(map[i] == map[i+4]){
                    //console.log("Power")
                    map[i+4] = map[i+4]*3; 
                    map[i]=0;
                }

                if(map[i] != map[i+4]){
                    //idk
                }
            }
        }
        return update();
    }

});

function checkMap(){ //check if there are empy spaces on map

    let i = 0;
    map.forEach(e => {
        if(e > 0){
            i++;
        }
    });
    if(i >= 15){
        console.log("Game Over")
        return 0;
    }
}

function getValue(){ //get value from map[] and put it into box
    for(let e = 0; e<map.length;e++){
        let box = document.getElementById(e);

        if(map[e] > 0){ 
            box.innerText = map[e];
        }else{
            box.innerText = " ";
        }
    }
}

