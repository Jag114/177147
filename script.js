var map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function wynik(){
    var suma = 0;
    for (let i = 0; i < map.length; i++) {
        suma += map[i];
    }
    return suma;
}

function update(){

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

document.addEventListener("keydown",function(event){
switch(event.code) {
    case "KeyS":
    case "ArrowDown":
        for(let i = 0; i < 15; i++){  
            if(map[i]>0){
                if(map[i] == map[i+4]){
                    //console.log("Power")
                    map[i+4] = Math.pow(map[i+4],2); 
                    map[i]=0;
                }
            }
        }
        return update();
    case "KeyW":
    case "ArrowUp":
        console.log(event.code);
        return update();
    case "KeyA":
    case "ArrowLeft":
        console.log(event.code);
        return update(); 
    case "KeyD":
    case "ArrowRight":
        console.log(event.code);
        return update(); 
    }

});

function checkMap(){

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

function getValue(){
    for(let e = 0; e<map.length;e++){
        let box = document.getElementById(e);

        if(map[e] > 0){ 
            box.innerText = map[e];
        }else{
            box.innerText = " ";
        }
    }
}

