let canvas = document.getElementById("snake"); //cria elemento que irá rodar o jogo

// Contexto -> renderiza o desenho dentro do canvas "2d: trata o arquivo como um plano 2D"
let context = canvas.getContext("2d");

let box = 32; // pixels por cada quadrado
let snake = []; // array para criar a cobra

snake[0] = { // define tamanho cobra
    x: 8 * box,
    y: 8 * box
}

let direction = "right"; // variável movimento

let food = { // varíavel comida
    x: Math.floor(Math.random() * 15 + 1) * box, // Math.random -> Retorna um número aleatório
    y: Math.floor(Math.random() * 15 + 1) * box // Math.floor -> Retira o ponto flutuante do .random
}

function criarBG(){ // Desenha o canvas e define a cor
    context.fillStyle = "lightgreen"; //cor
    context.fillRect(0,0,16*box,16*box); //desenha a área do jogo, fillRect(posição de x,y,largura,altura)
}

function criarCobrinha(){ // percorre o array e realiza incremento
    for(i =0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){ // desenha a comida
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); // quando um evento acontece, detecta e chama uma função

function update (event){// detecta tecla pressionada e define a direção
    if(event.keyCode == 37 && direction != "right") direction = "left"; // condicional que impede de tomar
    if(event.keyCode == 38 && direction != "down") direction = "up"; // a direção oposta a tecla pressionada
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0; // faz com que a cobrinha reapareça do lado
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box; // oposto da tela ao atingir uma das
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0; // extremidades do quadrado
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){ // acaba o jogo ao se chocar com o próprio corpo
        if (snake[0].x == snake[i].x && snake[0].y == snake [i].y){
            alert('Game Over! :)');
            var r = confirm("Deseja jogar novamente?");
            if (r == true) {
                location.reload();
            } else {
                clearInterval(jogo);
            }
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    // ponto de partida da cobrinha
    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    // incrementa ou decrementa 1 quadrado de acordo com a direção da cobra
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y){ 
        snake.pop(); // pop tira o último elemento da lista
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona novo elemento no ínicio do array (no caso a cabeça da cobra)
}

let jogo = setInterval(iniciarJogo, 100); // atualiza iniciaJogo a cada 100 ms
