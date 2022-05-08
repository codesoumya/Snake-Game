// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
// speed controller slider
var slider = document.getElementById("snakeSpeed");
var speed = 8;

let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 10, y: 10}
];

food = {x: 6, y: 7};





var bordercheck;


// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    var slider = document.getElementById("snakeSpeed");
    var Speedoutput = document.getElementById("speedOutput");
    Speedoutput.innerHTML = slider.value;
    speed = slider.value;
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function fluid(snake){
    if(snake[0].x >30){
        snake[0].x = 1;
    }else if(snake[0].x <1){
        snake[0].x = 30;
    }else if(snake[0].y <1){
        snake[0].y =30;
    }else if(snake[0].y >30){
        snake[0].y =1;
    }
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 30 || snake[0].x <=0 || snake[0].y >= 30 || snake[0].y <=0){
        if(bordercheck){
            return true;
        }else{
            fluid(snake);
        }
        
        // return true;
        
    }
        
    return false;
}

function remove_board_style(){
    board.classList.remove('board_style_1');
    board.classList.remove('board_style_2');
    board.classList.remove('board_style_3');
    board.classList.remove('board_style_4');
}

function remove_body_img(){
    body.classList.remove('bg_theam_1');
    body.classList.remove('bg_theam_2');
    body.classList.remove('bg_theam_3');
    body.classList.remove('bg_theam_4');
    body.classList.remove('bg_theam_5');
}
function remove_food(){
    foodElement.classList.remove('food1');
    foodElement.classList.remove('food2');
    foodElement.classList.remove('food3');
    foodElement.classList.remove('food4');
    foodElement.classList.remove('food5');
    foodElement.classList.remove('food6');
    
}

function remove_fontcolor_of_switch(){
    border_button.classList.remove('font_color1');
    border_button.classList.remove('font_color2');
    music_button.classList.remove('font_color1');
    music_button.classList.remove('font_color2');
    gSound_button.classList.remove('font_color1');
    gSound_button.classList.remove('font_color2');
}

function add_fontcolor1_of_switch(a){
    border_button.classList.add(a);
    music_button.classList.add(a);
    gSound_button.classList.add(a);
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        if(gSound_check){
            gameOverSound.play();
        }
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        if(gSound_check){
            foodSound.play();
        }
        
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }


    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // scoreBo.innerHTML = snakeArr[0].x + "  " +snakeArr[0].y;
    scoreBo.innerHTML = '<small style="font-size:20px;">Developed by -</small><br>CodeSoumya';
    // border btn
    bordercheck = document.getElementById("btn").checked;
    if(bordercheck){
        board.classList.add('splBorder');
        board.classList.remove('the_board');
    }else{
        board.classList.remove('splBorder');
        board.classList.add('the_board');
    }
    // music btn
    music_check = document.getElementById("music_btn").checked;
    if(music_check){
        musicSound.play();
    }else{
        musicSound.pause();
    }
    // game sound btn
    gSound_check = document.getElementById("gSound_btn").checked;

    // board style
    var selected = document.querySelector('input[type=radio][name=rate]:checked').value;
    if(selected == 'Theam One'){
        remove_board_style();
        board.classList.add('board_style_2');
    }else if(selected == 'Theam Two'){
        remove_board_style();
        board.classList.add('board_style_3');

    }else if(selected == 'Theam Three'){
        remove_board_style();
        board.classList.add('board_style_1');
    }else if(selected == 'Theam Four'){
        remove_board_style();
        board.classList.add('board_style_4');
    }

    var bg_selected = document.querySelector('input[type=radio][name=bgthm]:checked').value;
    if(bg_selected == 'Theam One'){
        remove_body_img();
        body.classList.add('bg_theam_1');
        remove_fontcolor_of_switch()
        add_fontcolor1_of_switch('font_color1')
    }else if(bg_selected == 'Theam Two'){
        remove_body_img();
        body.classList.add('bg_theam_2');
        remove_fontcolor_of_switch()
        add_fontcolor1_of_switch('font_color1')
    }else if(bg_selected == 'Theam Three'){
        remove_body_img();
        body.classList.add('bg_theam_3');
        remove_fontcolor_of_switch()
        add_fontcolor1_of_switch('font_color1')
    }else if(bg_selected == 'Theam Four'){
        remove_body_img();
        body.classList.add('bg_theam_4');
        remove_fontcolor_of_switch()
        add_fontcolor1_of_switch('font_color2')
    }
    // console.log(selected.value);

    
    

    var snk_selected = document.querySelector('input[type=radio][name=snkthm]:checked').value;
    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            if(snk_selected == 'Theam One'){
                snakeElement.classList.add('head1');
            }else if(snk_selected == 'Theam Two'){
                snakeElement.classList.add('head2');
            }else if(snk_selected == 'Theam Three'){
                snakeElement.classList.add('head3');
            }else if(snk_selected == 'Theam Four'){
                snakeElement.classList.add('head4');
            }
        }
        else{
                if(snk_selected == 'Theam One'){
                    snakeElement.classList.add('snake1');
                }else if(snk_selected == 'Theam Two'){
                    snakeElement.classList.add('snake2');
                }else if(snk_selected == 'Theam Three'){
                    snakeElement.classList.add('snake3');
                }else if(snk_selected == 'Theam Four'){
                    snakeElement.classList.add('snake4');
                }
            
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food1')
    if(score%6===0){
        remove_food();
        foodElement.classList.add('food6');
    }else if(score%5===0){
        remove_food();
        foodElement.classList.add('food5');
    }else if(score%4===0){
        remove_food();
        foodElement.classList.add('food4');
    }else if(score%3===0){
        remove_food();
        foodElement.classList.add('food3');
    }else if(score%2===0){
        remove_food();
        foodElement.classList.add('food2');
    }else if(score%1===0){
        remove_food();
        foodElement.classList.add('food1');
    }
    board.appendChild(foodElement);


}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    if(gSound_check){
        moveSound.play();
    }
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});

arrow_up.addEventListener('click',e=>{
    inputDir.x = 0;
    inputDir.y = -1;
})

arrow_down.addEventListener('click',e=>{
    inputDir.x = 0;
    inputDir.y = 1;
})

arrow_left.addEventListener('click',e=>{
    inputDir.x = -1;
    inputDir.y = 0;
})

arrow_right.addEventListener('click',e=>{
    inputDir.x = 1;
    inputDir.y = 0;
})