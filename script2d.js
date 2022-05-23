var map2D = [[0,0,0], //[0]
             [0,0,0], //[1]
             [0,0,0]];//[2]

function update2d(){ //generate,update map

    let row1 = Math.floor(Math.random() * (4 - 0));
    let row2 = Math.floor(Math.random() * (4 - 0));
    let col1 = Math.floor(Math.random() * (4 - 0));
    let col2 = Math.floor(Math.random() * (4 - 0));
    
    console.log("Update2: ",row1, col1, row2,col2);
    if(map2D[row1][col1] != 0 || map[row2][col2] != 0){
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
        console.log("Update: ",rand)
        if(map[row1][col1] == 0){
            map[row1][col1] = 3;
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