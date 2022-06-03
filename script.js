//TODO
//move() function
//save map[] state to local storage or sth
//add animations

var map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var arrW = [0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15];
var arrS = [15,11,7,3,14,10,6,2,13,9,5,1,12,8,4,0];
var arrA = [12,13,14,15,8,9,10,11,4,5,6,7,0,1,2,3]; // L > P
var arrD = [3,2,1,0,7,6,5,4,11,10,9,8,15,14,13,12]; // P > L

function wynik(){//count score
    var suma = 0;
    for (let i = 0; i < map.length; i++) {
        suma += map[i];
    }
    return suma;
}

function update(){ //generate,update map

    let scoreCount = document.getElementById("top");
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
    
    if(wynik()>=6){
        let rand = Math.floor(Math.random() * (16 - 0));
        console.log("Update: ",rand)
        if(map[rand] == 0){
            map[rand] = 3;
            console.table("Wynik >= 6: ",wynik());
            scoreCount.innerText = "Score: "+wynik();
            //animate(rand);
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
            console.log("Wynik < 6: ",wynik());
            scoreCount.innerText = "Score: "+wynik();
            //animate(rand1,rand2)
            return getValue(), checkMap();
        }
}

document.addEventListener("keydown",function move(event){ //take input and modify map accordingly
switch(event.code) {                                      // 1st check if same powers,then check if empty
    case "KeyS":
    case "ArrowDown":
        arrS.forEach(e => {
            if(map[e] == map[e+12]){
                map[e+12] = map[e+12]*3; 
                map[e]=0;
            }
            if(map[e] == map[e+8]){
                map[e+8] = map[e+8]*3; 
                map[e]=0;
            }
            if(map[e] == map[e+4]){
                map[e+4] = map[e+4]*3; 
                map[e]=0;
            }
        });
        for(let i = 0; i <= map.length; i++){  
            if(map[i] > 0){

                if(map[i+4] == 0){
                    map[i+4] = map[i];
                    map[i] = 0;   
                }
                if(map[i] != map[i+4]){
                    console.log("idk");
                }
            }
        }
        return update();
    case "KeyW":
    case "ArrowUp":
        arrW.forEach(e => {
            if(map[e] == map[e-12]){
                map[e-12] = map[e-12]*3; 
                map[e]=0;
            }
            if(map[e] == map[e+8]){
                map[e-8] = map[e-8]*3; 
                map[e]=0;
            }
            if(map[e] == map[e-4]){
                map[e-4] = map[e-4]*3; 
                map[e]=0;
            }
        });
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
        return update();
    case "KeyA":
    case "ArrowLeft":
        arrA.forEach(e => {
            if(e != 0 && e != 4 && e != 8 && e != 12){
                if(map[e] == map[e-1]){
                    map[e-1] = map[e-1]*3; 
                    map[e]=0;
                }
            }
        });
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
        return update();
    case "KeyD":
    case "ArrowRight":
        arrD.forEach(e => {
            if(e != 3 && e != 7 && e != 11 && e != 15){
                if(map[e] == map[e+1]){
                    map[e+1] = map[e+1]*3; 
                    map[e]=0;
                }
            }
        });
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

function animate(id1, id2=16){
    let id = null;
    const elem1 = document.getElementById(id1);   
    const elem2 = document.getElementById(id2);  
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
        elem1.style.backgroundColor = "red"; 
        elem2.style.backgroundColor = "red";   
  }
}

