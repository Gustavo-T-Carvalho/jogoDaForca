const criaJogo = (sprite) => {
  let etapa = 1,
    palavraSecreta,
    lacunas = [],
    arrayPalavraSecreta;

  const ganhou = () => {
    // return !lacunas.some(function(lacuna){
    //   return lacuna == '';
    // });

    let ganhouJogo = false;

    if (!lacunas.includes("") && !perdeu()) {
      ganhouJogo = true;
    }
    return ganhouJogo;
  };

  const perdeu = () => sprite.isFinished();

  const ganhouOuPerdeu = () => ganhou() || perdeu();

  const reinicia = () => {
    palavraSecreta = "";
    lacunas = [];
    sprite.reset();
    etapa = 1;
  };

  const setPalavraSecreta = (palavra) => {
    if (!palavra.trim()) {
      throw new Error("Palavra secreta inválida");
    }
    palavraSecreta = palavra;
    arrayPalavraSecreta = [...palavraSecreta];
    _setLacunas(palavraSecreta);
    ProximaEtapa();
  };

  // Utilizando RegEXp
  const processaChute = (chute) => {
    if (!chute.trim()) {
      throw new Error("Chute inválida");
    }

    const exp = new RegExp(chute, "gi");
    let resultado,
      acertou = false;

    while ((resultado = exp.exec(palavraSecreta))) {
      acertou = lacunas[resultado.index] = chute;
    }
    if (!acertou) sprite.nextFrame();
  };

  //   var processaChute = function (chute) {
  //     if (arrayPalavraSecreta.includes(chute)) {
  //       arrayPalavraSecreta.forEach((letra, index) => {
  //         if (letra == chute) {
  //           lacunas[index] = chute;
  //         }
  //       });
  //     } else {
  //       sprite.nextFrame();
  //     }
  //   };

  const _setLacunas = (palavraSecreta) => {
    arrayPalavraSecreta.forEach((letra) => {
      lacunas.push("");
    });
  };

  const getLacunas = () => lacunas;

  const getEtapa = () => etapa;

  const ProximaEtapa = () => (etapa += 1);

  return {
    setPalavraSecreta,
    getLacunas,
    getEtapa,
    processaChute,
    ganhou,
    perdeu,
    ganhouOuPerdeu,
    reinicia,
  };
};
