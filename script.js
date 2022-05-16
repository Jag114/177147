var map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function update(){

    let rand1 = Math.floor(Math.random() * (16 - 0));
    let rand2 = Math.floor(Math.random() * (16 - 0));
    console.log("Update: ",rand1,rand2)

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
    }else{
        checkMap()
        let box1 = document.getElementById(rand1);
        let box2 = document.getElementById(rand2);
        if(box2 == box1){
            return update();
        }else{
            map[rand1] = 3;
            map[rand2] = 3;
            console.table(map);
            return getValue();
            
        }
    }
    
}

document.addEventListener("keydown",function(event){
switch(event.code) {
    case "KeyS":
    case "ArrowDown":
        //console.log(event.code);
        for(let i = 0; i < 15; i++){
            //console.log("i: ",i)
            if(map[i]>0){
                if(map[i] == map[i+4]){
                    console.log("Power")
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

    let score = 0;
    for(let x = 0; x < map.length; x++){
        score += map[x];
    }
    let barScore = document.getElementsByClassName("score");
    barScore.innerText = score;

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