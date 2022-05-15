var map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function generate(){
    let rand1 = Math.floor(Math.random() * (16 - 0));
    let rand2 = Math.floor(Math.random() * (16 - 0));

    let box1 = document.getElementById(rand1);
    let box2 = document.getElementById(rand2);
    console.log(rand1,rand2)
    if(box2 == box1){
        return generate();
    }else{
        map[rand1] = 3;
        map[rand2] = 3;
        console.table(map);
        return box1.innerText = map[rand1], box2.innerText=map[rand2];
    }
    
}



document.addEventListener("keydown",function(event){
switch(event.code) {
    case "KeyS":
    case "ArrowDown":
        console.log(event.code);
        //Math.pow(map[i],2);
    break;
    case "KeyW":
    case "ArrowUp":
        console.log(event.code);

    break;
    case "KeyA":
    case "ArrowLeft":
        console.log(event.code);

    break;
    case "KeyD":
    case "ArrowRight":
        console.log(event.code);

    break;
    }

});

