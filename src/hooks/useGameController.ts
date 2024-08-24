import { useState } from 'react'
import { CellText } from '../types/CellText'

export const useGameController = () => {
    const [isFirst, setIsFirst] = useState(true)
    const [cells, setCells] = useState<CellText[]>(Array(16).fill(' '))
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
        [ 0, 1, 2, 3],
        [ 4, 5, 6, 7],
        [ 8, 9,10,11],
        [12,13,14,15],
        [ 0, 4, 8,12],
        [ 1, 5, 9,13],
        [ 2, 6,10,14],
        [ 3, 7,11,15],
        [ 0, 5,10,15],
        [ 3, 6, 9,12],
    ]
    const isWin = victoryConditions.some((victoryCondition) => {
        const [a, b, c, d] = victoryCondition
        if (cells[a] === ' ') return false
        if (cells[a] !== cells[b]) return false
        if (cells[a] !== cells[c]) return false
        if (cells[a] !== cells[d]) return false
        return true
    })
    const winner: CellText = isFirst ? 'X' : 'O'

    return { cells, nowPlayer, winner, isWin, cellClick}
}