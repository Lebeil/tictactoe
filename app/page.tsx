'use client'

import {Board} from '@/app/components/Board'
import styles from '@/app/page.module.css'
import {useState} from 'react'

export default function Page() {
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState<(string[] | null)[]>([[]])
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setCurrentMove(nextHistory.length - 1)
    setHistory([...history, nextSquares])
    setXIsNext(!xIsNext)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
    console.log('nextMove', nextMove)
    setXIsNext(nextMove % 2 === 0)
    console.log('XisNext', nextMove % 2 === 0)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = 'Aller au coup #' + move
    } else {
      description = 'Revenir au début'
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className={styles.pageContainer}>
      <div className={styles.boarding}>
        <Board xIsNext={xIsNext}
               squares={currentSquares || Array(9).fill(null)}
               onPlay={handlePlay} />
      </div>
      <div className={styles.gameInfo}>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

