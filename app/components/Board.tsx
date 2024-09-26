import {Square} from '@/app/components/Square'
import React from 'react'
import styles from '../page.module.css'

interface BoardProps {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
}

export function Board({xIsNext, squares, onPlay}: BoardProps) {

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    onPlay(nextSquares)
  }

  const handleReload = () => {
    window.location.reload()
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = winner + ' a gagné'
  } else {
    status = 'Prochain tour : ' + (xIsNext ? 'X' : 'O')
  }


  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.texting}>
          <h1 className={styles.colorBlack}>Morpion</h1>
          <div className={styles.colorBlack}>{status}</div>
          <button onClick={handleReload}>Recommence</button>
        </div>
        <div className={styles.gridContainer}>
          <Square value={squares[0]}
                  onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]}
                  onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]}
                  onSquareClick={() => handleClick(2)} />

          <Square value={squares[3]}
                  onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]}
                  onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]}
                  onSquareClick={() => handleClick(5)} />

          <Square value={squares[6]}
                  onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]}
                  onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]}
                  onSquareClick={() => handleClick(8)} />
        </div>
      </div>

    </>
  )

  function calculateWinner(squares: string[]): string | null {
    if (!squares || squares.length === 0) {
      return null
    }

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

}
