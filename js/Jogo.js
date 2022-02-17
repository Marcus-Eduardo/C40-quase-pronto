class Jogo {
    constructor() {}
    //pegar estado de jogo
    getState() {
        var estadoJogo = database.ref("estadoJogo");
        estadoJogo.on("value", function (data) {
            estadoJogo = data.val();
        });
    }

    //atualizar estado de jogo
    update(estado) {
        database.ref('/').update({
            estadoJogo: estado
        });
        estadoJogo = estado;
    }

    //iniciar o jogo
    async start() {
        if (estadoJogo === 0) {
            jogador = new Jogador();
            var refNumJogadores = await database.ref('numJogadores').once("value");
            if (refNumJogadores.exists()){
                numJogadores = refNumJogadores.val();
                jogador.getCount();
            }
            form = new Form();
            form.display();
        }
        carro1 = createSprite(400,displayHeight/2);//novo
        carro1.addImage(imgcarro1);     
        carro2 = createSprite(600,displayHeight/2);//novo 
        carro2.addImage(imgcarro2);        
        carro3 = createSprite(800,displayHeight/2);//novo
        carro3.addImage(imgcarro3);
        carro4 = createSprite(1000,displayHeight/2);//novo
        carro4.addImage(imgcarro4);
        carros = [carro1, carro2, carro3, carro4]; //novo
    }

    //estado de jogo jogar
    jogar() {
        form.esconder();
        Jogador.getInfoJogadores();

        if (todosJogadores !== undefined) {
            //indice ada matriz de carros
            background(solo);
            image(pista,0,-displayHeight*3.8,displayWidth,displayHeight*5)
            var indice = 0;//novo

            var x = 200;//novo
            var y;//novo


            // deixar o texto do jogador atual vermelho
            for (var jgdr in todosJogadores) {

                indice += 1;//novo
                x += 200;//novo

                y = displayHeight - todosJogadores[jgdr].distancia;//novo

                carros[indice-1].x = x;//novo
                carros[indice-1].y = y;//novo

                if (indice === jogador.indice) {//novo
                    camera.position.x = displayWidth/2;//novo
                    camera.position.y = carros[indice-1].y;//novo
                    stroke(0);
                    fill("red");
                    ellipse(x,y,60,60)
                }
            }
        }

        if (keyDown(UP_ARROW) && jogador.indice !== null) {
            jogador.distancia += 50;
            jogador.update();
            if(jogador.distancia >= 3600){
                jogador.distancia = 3600
            }
        }
        if(jogador.distancia === 3600){
            estadoJogo = 2
        }
    }
    fim(){
        console.log("fim de jogo")
    };
}