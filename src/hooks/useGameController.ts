import { useState } from 'react'
import { CellText } from '../types/CellText'

export const useGameController = () => {
    const [isFirst, setIsFirst] = useState(true)
//    const [cells, setCells] = useState<CellText[]>(Array(16).fill(' '))
    const [cells, setCells] = useState<CellText[]>([
        ' ', ' ', ' ', ' ',
        ' ', 'O', 'X', ' ',
        ' ', 'X', 'O', ' ',
        ' ', ' ', ' ', ' ',
    ])

    const directions = [
        [-1, -1], [ 0, -1], [1, -1],
        [-1,  0],           [1,  0],
        [-1,  1], [ 0,  1], [1,  1],
    ]

    const canPlaceHere = (index: number, player: 'O' | 'X') => {
        const x = index % 4
        const y = Math.floor(index / 4)

        for (const [dx, dy] of directions) {
            let nx = x + dx
            let ny = y + dy
            let foundEnemy = false

            while (0 <= nx && nx < 4 && 0 <= ny && ny < 4) {
                const nextIndex = nx + ny * 4
                if (cells[nextIndex] === ' ') break
                if (cells[nextIndex] !== player) {
                    foundEnemy = true
                }
                else {
                    if (foundEnemy) return true
                    break
                }
                nx += dx
                ny += dy
            }
        }
        return false
    }

    const flipCells = (index: number, player: 'O' | 'X') => {
        const x = index % 4
        const y = Math.floor(index / 4)

        const newCells = [...cells]

        for (const [dx, dy] of directions) {
            let nx = x + dx
            let ny = y + dy
            let placeIndexs = []

            while (0 <= nx && nx < 4 && 0 <= ny && ny < 4) {
                const nextIndex = nx + ny * 4
                if (newCells[nextIndex] === ' ') break
                if (newCells[nextIndex] !== player) {
                    placeIndexs.push(nextIndex)
                }
                else {
                    for (const flipIndex of placeIndexs) {
                        newCells[flipIndex] = player
                    }
                    break
                }
                nx += dx
                ny += dy
            }
        }
        newCells[index] = player
        setCells(newCells)
    }

    const cellClick = (i: number) => {
        if (isWin) return
        if (cells[i] !== ' ') return

        const player = isFirst ? 'O' : 'X'
        if (!canPlaceHere(i, player)) return

        flipCells(i, player)
        setIsFirst((old) => !old)
    }

    const nowPlayer: CellText = isFirst ? 'O' : 'X'
    const isWin = false
    const winner: CellText = isFirst ? 'X' : 'O'

    return { cells, nowPlayer, winner, isWin, cellClick}
}