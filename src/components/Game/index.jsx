import './style.css'
import { useEffect, useState } from 'react'

import Item from '../template/Item'
import ModalEndGame from '../template/ModalEndGame'

import { MdClose } from 'react-icons/md';
import { MdOutlineCircle } from 'react-icons/md';

let tabela = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]

function marcaTabela(id, jogadaX) {
  if (id < 3) {
    tabela[0][id] = jogadaX ? 'x' : 'o'
  } else if (id < 6) {
    tabela[1][id-3] = jogadaX ? 'x' : 'o'
  } else {
    tabela[2][id-6] = jogadaX ? 'x' : 'o'
  }
}

function verificaVitoria(simbolo) {

  // diagonal esq - dir
  if (tabela[0][0] === simbolo && tabela[1][1] === simbolo
      && tabela[2][2] === simbolo) {
    return true
  }

  // diagonal dir - esq
  if (tabela[0][2] === simbolo && tabela[1][1] === simbolo
      && tabela[2][0] === simbolo && simbolo) {
    return true
  }

  // linha / coluna
  for (let i = 0; i < 3; i++) {
    if (tabela[i][0] === simbolo && tabela[i][1] === simbolo
        && tabela[i][2] === simbolo) {
      return true
    } else if (tabela[0][i] === simbolo && tabela[1][i] === simbolo
        && tabela[2][i] === simbolo) {
      return true
    }
  }

  return false
}

function Game() {
  const [jogadaOp, setJogadaOp] = useState({
    totalJogadas: 0,
    jogadaX: true
  })

  const [game, setGame] = useState({
    finalizado: false,
    vencedor: '',
  })

  useEffect(() => {
    if (verificaVitoria("x")){
      console.log("X ganhou");
      setGame({
        finalizado: true,
        vencedor: 'x',
      })
    }else if(verificaVitoria("o")) {
      console.log("O ganhou");
      setGame({
        finalizado: true,
        vencedor: 'o',
      })
    }else if (jogadaOp.totalJogadas === 9) {
      console.log("Jogo empatado...");
      setGame({
        finalizado: true,
        vencedor: '',
      })
    }
  }, [jogadaOp])

  function click(setMarcador, foiSelecionado, id) {
    if ( !foiSelecionado ) {

      marcaTabela(id, jogadaOp.jogadaX)

      setMarcador({
        selecionado: true,
        vezX: jogadaOp.jogadaX
      })

      setJogadaOp({
        totalJogadas: jogadaOp.totalJogadas + 1,
        jogadaX: !jogadaOp.jogadaX
      })
    }
  }

  return (
    <div className="game">
      { game.finalizado && 
        <ModalEndGame>
          {game.vencedor === 'x' && <h2><MdClose color="#3cd25b" size={50} /> venceu</h2>}
          {game.vencedor === 'o' && <h2><MdOutlineCircle color="#6062f3" size={50} /> venceu</h2>}
          {game.vencedor === '' && <h2>empate</h2>}
        </ModalEndGame> 
      }

      <h1>Jogo da Velha</h1>
      <div className="game__table">
        {tabela.map((linha, it) => {
          return (
            <div key={"22ed" + it} className="game__row">
              <Item id={linha[0]} click={click} />
              <Item id={linha[1]} click={click} />
              <Item id={linha[2]} click={click} />
            </div>
          )
        })}   
      </div>
    </div>
  )
}

export default Game