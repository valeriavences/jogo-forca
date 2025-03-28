import entradaDados from 'readline-sync';
import listaDeFrutas from './dados/dados.js';
import {
   validarLetraDigitada,
   verificarJogoGanho, 
  verificarLetraPresenteNaPalavra,
jogadasRestantes,
 atualizarPalavraOculta,
  exibirMensagemFimDeJogo, 
} from './funcoes/funcoes.js';



function jogarForca() { // Função principal do jogo

  const palavraEscolhida = listaDeFrutas[Math.floor(Math.random() * listaDeFrutas.length)];

  // Oculta a palavra escolhida com 'underlines' deixando visivel somente a letra inicial
  let primeiraLetra = palavraEscolhida[0]
  let underline = "_".repeat(palavraEscolhida.length - 1)
  let palavraOculta = primeiraLetra + underline

  let erros = 0;
  let statusJogo = 'andamento' // jogo inicia com o status 'andamento'

  console.log(`------------JOGO DA FORCA------------`);
  console.log(`\nNome da fruta com ${palavraEscolhida.length} letras:`);

  while (statusJogo === 'andamento') {  // Loop continua enquanto o status do jogo estiver em 'andamento'
    console.log(`\nFruta: ${palavraOculta}`);
    
     // Recebe a letra digitada pelo usuário aceitando tanto maiuscula quanto minuscula
    const letraDigitada = entradaDados.question("Digite uma letra: ").toLowerCase();

    if (validarLetraDigitada(letraDigitada)) {
      if (verificarLetraPresenteNaPalavra(palavraEscolhida, letraDigitada)) {
        palavraOculta = atualizarPalavraOculta(palavraOculta, letraDigitada, palavraEscolhida);
        if (verificarJogoGanho(palavraOculta, palavraEscolhida)) {
          statusJogo = 'venceu'
        }
      } else {
        erros++

        const chances = jogadasRestantes(erros)

        if (chances > 0) {
          console.log(`OPCÃO ERRADA! Você ainda tem ${chances} chance(s)!`);
        } else {
          statusJogo = 'perdeu'
        }
      }
    } else {
      console.log("\nPor favor, digite uma letra válida.");
    }
  }
  // Consumindo função que exibe uma mensagem de vitoria ou derrota
  exibirMensagemFimDeJogo(statusJogo);
}

jogarForca();