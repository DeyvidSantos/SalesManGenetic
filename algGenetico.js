
function calcMelhorAtual() {
    var aux = Infinity;
    for (var i = 0; i < populacao.length; i++) {
      var d = calcDistancia(cidades, populacao[i]);
      if (d < distanciaInicial) {
        melhorGeracao = contadorGeracao;
        distanciaInicial = d;
        melhorViagem = populacao[i];
      }
      if (d < aux) {
        aux = d;
        melhorAtual = populacao[i];
      }
  
      taxaAcerto[i] = 1 /(d+1);
    }
  }

  function arrumarMelhorAtual() {
    var soma = 0;
    for (var i = 0; i < taxaAcerto.length; i++) {
      soma += taxaAcerto[i];
    }
    for (var i = 0; i < taxaAcerto.length; i++) {
      taxaAcerto[i] = taxaAcerto[i] / soma;
    }
  }


  function proximaGeracao() {
    var novaPopulacao = [];
    for (var i = 0; i < populacao.length; i++) {
      var ordemA = escolherUm(populacao, melhorAtual);
      var ordemB = escolherUm(populacao, melhorAtual);
      var ordem =  crossOver(ordemA, ordemB);
      mutate(ordem);
      novaPopulacao[i] = ordem;
    }
    contadorGeracao++;
    populacao = novaPopulacao;
  
  }

  function escolherUm(list, prob) {
    var index = 0;
    var rand = random(1);
  
    while (rand > 0) {
        rand = rand - prob[index];
      index++;
    }
    index--;
    return list[index].slice();
  }

  function crossOver(ordemA, ordemB) {
    var inicio = floor(random(ordemA.length));
    var fim = floor(random(inicio + 1, ordemA.length));
    var novaOrdem = ordemA.slice(inicio, fim);
    

    for (var i = 0; i < ordemB.length; i++) {
      var cidade = ordemB[i];
      if (!novaOrdem.includes(cidade)) {
        novaOrdem.push(cidade);
      }
    }
    return novaOrdem;
  }

  function mutate(ordem, taxaMutacao) {
    for (var i = 0; i < totalcidades; i++) {
      if (random(1) < taxaMutacao) {

        var indexA = floor(random(ordem.length));
        var indexB = (indexA + 1) % totalcidades;
        swap(ordem, indexA, indexB);
      }
    }
  }
  