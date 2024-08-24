import { useState } from 'react'
import { CellText } from '../types/CellText'

export const useGameController = () => {
    const [isFirst, setIsFirst] = useState(true)
    const [cells, setCells] = useState<CellText[]>(Array(9).fill(' '))
    const cellClick = (i: number) => {
        if (isWin) return
        if (cells[i] !== ' ') return
        setCells((olds) => {
            olds[i] = isFirst ? 'O' : 'X'
            return [...olds]
        })
        setIsFirst((old) => !old)
    }
    const nowPlayer: CellText = isFirst ? 'O' : 'X'
    const victoryConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    const isWin = victoryConditions.some((victoryCondition) => {
        const [a, b, c] = victoryCondition
        if (cells[a] === ' ') return false
        if (cells[a] !== cells[b]) return false
        if (cells[a] !== cells[c]) return false
        return true
    })
    const winner: CellText = isFirst ? 'X' : 'O'

    return { cells, nowPlayer, winner, isWin, cellClick}
}