class Jogo{
    constructor(){}


    /*Esta função serve para obter o valor do estado de jogo no banco de dados e inseri-la na variável estadoJogo.
    Estamos chamando ela logo quando abrimos o jogo, na função setup do arquivo sketch*/
    obterEstado(){
        var estadoJogoRef = bancoDados.ref('gameState');
        estadoJogoRef.on("value", function(data){
            estadoJogo = data.val();
        })
    }

    /*Esta função serve para alterar o estado de jogo no banco de dados. 
    Atualmente estamos chamando ela no arquivo sketch para mudar o estado de jogo de 0 para 1 
    quando 4 jogadores entram na partida.*/
    atualizarEstado(estado){
        bancoDados.ref('/').update({
            gameState: estado
        })
    }

    /*Esta função é chamada no inicio do jogo, quando o estado de jogo é 0 */
    async iniciar(){
        if(estadoJogo === 0){
            jogador = new Jogador(); //cria um novo jogador
            var contagemJogadoresRef = await bancoDados.ref('playerCount').once('value'); //busca a quantidade de jogadores no banco de dados. Usamos o await para que o computador aguarde o recebimento dessas informações antes de carregar o resto do jogo.

            //o método exists() verifica se o dado "playerCount" existe no firebase
            if(contagemJogadoresRef.exists()){
                contagemJogadores = contagemJogadoresRef.val(); //a quantidade de jogadores que recebemos do banco de dados é inserida na variável contagemJogadores
                jogador.obterContagem(); //esta função possui o ouvinte que ficará verificando o tempo todo se houve alteração na quantidade de jogadores e atualizará as informação na variável contagemJogadores.
            }
            formulario = new Formulario(); //cria um novo formulario
            formulario.mostrar(); //Exibe o formulário na tela
        }
    }

    /*Esta função é chamada no estado de jogo 1, quando já temos 4 jogadores e a corrida inicia.
    No momento apenas fizemos com que o nome e distância de cada jogador apareça na tela,
     e que seja possível aumentar o valor da distância pressionando a seta para cima*/
    jogar(){
        formulario.esconder();

        textSize(30);
        text("Jogo Iniciado", 120, 100);
        Jogador.obterInfoJogadores(); //função que busca a informação de todos os jogadores no banco de dados e as insere na variável todosJogadores.

        
        if(todosJogadores !== undefined){
            var posYtexto = 130;
            for(var cadaJogador in todosJogadores){
                if(cadaJogador === "player" + jogador.indice){
                    fill("red");
                }else{
                    fill("black");
                }

                posYtexto += 20;
                textSize(15);
                text(todosJogadores[cadaJogador].nome + ": "+todosJogadores[cadaJogador].distancia, 120, posYtexto);
            }
        }

        if(keyIsDown(UP_ARROW) && jogador.indice !== null){
            jogador.distancia += 50;
            jogador.atualizarDados();
        }

    }
}