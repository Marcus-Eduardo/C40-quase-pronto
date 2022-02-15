var database;
var estadoJogo = 0;
var numJogadores = 0;
var form, jogador, jogo;
var todosJogadores;
var carros, carro1, carro2, carro3, carro4;
var imgcarro1, imgcarro2, imgcarro3, imgcarro4
var solo,pista

function preload() {
  imgcarro1 = loadImage("images/car1.png");
  imgcarro2 = loadImage("images/car2.png");
  imgcarro3 = loadImage("images/car3.png");
  imgcarro4 = loadImage("images/car4.png");
  solo = loadImage("images/ground.png");
  pista = loadImage("images/track.jpg");
}

function setup() {
  database = firebase.database();
  createCanvas(displayWidth-20, displayHeight-120);
  jogo = new Jogo();
  jogo.getState();
  jogo.start();
}

function draw() {
  //atualizar o estado de jogo para um quando houver 4 jogadores
  console.log(estadoJogo);
  if(numJogadores >= 4 && estadoJogo === 0){
    jogo.update(1);
  }

  //limpa a tela e comaço o jogo se o modo de jogo for 1
  if(estadoJogo === 1){
    clear();
    jogo.jogar();
    drawSprites();
  }
  if(estadoJogo === 2){
    jogo.fim();
  }
}