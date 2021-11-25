var canvas;

var estadoJogo = 0;
var contagemJogadores;
var todosJogadores;
var bancoDados;

var formulario, jogador, jogo;


function setup(){
  canvas = createCanvas(400,400);
  bancoDados = firebase.database();

  jogo = new Jogo();
  jogo.obterEstado();
  jogo.iniciar();
}

function draw(){

  //O estado de jogo muda para 1 quando 4 jogadores entram na partida
  if(contagemJogadores === 4){
    jogo.atualizarEstado(1);
  }
 
  //Ao atingir o limite de 4 jogadores, o estado de jogo muda para 1 e a função jogar da classe Jogo é chamada
  if(estadoJogo === 1){

    //clear() serve para limpar a tela, mais exemplos e informações em https://p5js.org/reference/#/p5/clear
    clear();
    jogo.jogar();
  }

}


