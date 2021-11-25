class Formulario{
    constructor(){
        this.entrada = createInput("Nome");
        this.botao = createButton('Jogar');
        this.saudacao = createElement('h3');
    }

    esconder(){
        this.entrada.hide()
        this.botao.hide()
        this.saudacao.hide()
    }
    
    mostrar(){
        
        var titulo = createElement("h2");
        titulo.html("Car Racing Game");
        titulo.position(130,0);

        this.entrada.position(130,160);
        this.botao.position(250,200);

        this.botao.mousePressed(()=>{
            this.entrada.hide();
            this.botao.hide();

            jogador.nome = this.entrada.value();
        
            contagemJogadores += 1;
            jogador.indice = contagemJogadores;
            jogador.atualizarDados();
            jogador.atualizarContagem(contagemJogadores);

            this.saudacao.html("Olá "+ jogador.nome);
            this.saudacao.position(130,160);
        });

    }
}