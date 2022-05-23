var map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

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
            if(i != 0 && i != 4 && i != 8 && i != 12){
                if(map[i] > 0){
                    if(map[i-1] == 0){
                        map[i-1] = map[i];
                        map[i] = 0;     
                    }
    
                    if(map[i] == map[i-1]){
                        map[i-1] = map[i-1]*3; 
                        map[i]=0;
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
        for(let i = 0; i <= map.length; i++){  
            if(i != 3 && i != 7 && i != 11 && i != 15){
                if(map[i] > 0){
                    if(map[i+1] == 0){
                        map[i+1] = map[i];
                        map[i] = 0;     
                    }
    
                    if(map[i] == map[i+1]){
                        map[i+1] = map[i+1]*3; 
                        map[i]=0;
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

