var cidades = [];
var totalcidades = 10;

var tamanhoPopulacao = 300;
//cromossomos
var populacao = [];
//melhor rota
var taxaAcerto = [];

var distanciaInicial = Infinity;
var melhorViagem;
var melhorAtual;

var melhorGeracao =0;
var contadorGeracao =0 ;

var statusP;

function setup() {
    createCanvas(800, 800);
    var ordem = [];
    for (var i = 0; i < totalcidades; i++) {
      var v = createVector(random(width), random(height / 2));
      cidades[i] = v;
      ordem[i] = i;
    }
  
    for (var i = 0; i < tamanhoPopulacao; i++) {
        populacao[i] = shuffle(ordem);
    }
    statusP = createP('').style('font-size', '32pt');
  }


  function draw() {
    background(0);
  
    fill(0);
    stroke(255);
    strokeWeight(5);
    textSize(32);
    text('Geração Atual: ' + contadorGeracao, 10, 30);
    text('Melhor Caminho: ' + melhorGeracao, 300, 30);




    calcMelhorAtual();
    arrumarMelhorAtual();
    proximaGeracao();
  
    stroke(255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < melhorViagem.length; i++) {
        var n = melhorViagem[i];
        vertex(cidades[n].x, cidades[n].y);
        ellipse(cidades[n].x, cidades[n].y, 16, 16);
      }
    endShape();
  
    translate(0, height / 2);
    stroke(255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < melhorAtual.length; i++) {
      var n = melhorAtual[i];
      
      vertex(cidades[n].x, cidades[n].y);
      ellipse(cidades[n].x, cidades[n].y, 16, 16);
    }
    endShape();
}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  

  function calcDistancia(pontos, ordem) {
    var soma = 0;
    for (var i = 0; i < ordem.length - 1; i++) {
      //percorre o array de 1 em um e calcula a distancia e soma 
      var cidadeAIndex = ordem[i];
      var cidadeA = pontos[cidadeAIndex];
      var cidadeBIndex = ordem[i + 1];
      var cidadeB = pontos[cidadeBIndex];
      var d = dist(cidadeA.x, cidadeA.y, cidadeB.x, cidadeB.y);
      soma += d;
    }
    return soma;
  }