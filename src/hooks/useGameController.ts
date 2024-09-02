import { useState } from 'react'
import { CellText } from '../types/CellText'

export const useGameController = () => {
    const initialCells: CellText[] = [
        ' ', ' ', ' ', ' ',
        ' ', 'O', 'X', ' ',
        ' ', 'X', 'O', ' ',
        ' ', ' ', ' ', ' ',
    ]
    const [isFirst, setIsFirst] = useState(true)
    const [cells, setCells] = useState<CellText[]>(initialCells)

    const directions = [
        [-1, -1], [ 0, -1], [1, -1],
        [-1,  0],           [1,  0],
        [-1,  1], [ 0,  1], [1,  1],
    ]

    const getFlipIndexes = (index: number, player: 'O' | 'X') => {
        const x = index % 4
        const y = Math.floor(index / 4)
        let flipIndexes: number[] = []

        for (const [dx, dy] of directions) {
            let nx = x + dx
            let ny = y + dy
            let potentialFlips: number[] = []

            while (0 <= nx && nx < 4 && 0 <= ny && ny < 4) {
                const nextIndex = nx + ny * 4
                if (cells[nextIndex] === ' ') break
                if (cells[nextIndex] !== player) {
                    potentialFlips.push(nextIndex)
                }
                else {
                    flipIndexes = flipIndexes.concat(potentialFlips)
                    break
                }
                nx += dx
                ny += dy
            }
        }
        return flipIndexes
    }

    const canPlaceHere = (index: number, player: 'O' | 'X') => {
        if (cells[index] !== ' ') return false
        return getFlipIndexes(index, player).length > 0
    }

    const flipCells = (index: number, player: 'O' | 'X') => {
        const newCells = [...cells]
        const flipIndexes = getFlipIndexes(index, player)

        flipIndexes.forEach(flipIndex => {
            newCells[flipIndex] = player
        })

        newCells[index] = player
        setCells(newCells)
    }

    const cellClick = (i: number) => {
        if (isGameFinished) return
        if (cells[i] !== ' ') return

        const player = isFirst ? 'O' : 'X'
        if (!canPlaceHere(i, player)) return

        flipCells(i, player)
        setIsFirst((old) => !old)
    }

    const passTurn = () => {
        setIsFirst((old) => !old)
    }

    const isGameFinishedValue = () => {
        const boardFull = !cells.includes(' ')
        const noMoveLeft = !cells.some((_, i) => canPlaceHere(i, 'O') || canPlaceHere(i, 'X'))

        return boardFull || noMoveLeft
    }

    const resetBoard = () => {
        setCells(initialCells)
        setIsFirst(true)
    }

    const nowPlayer: CellText = isFirst ? 'O' : 'X'

    const isGameFinished = isGameFinishedValue()
    const isPassRequired = !cells.some((_, i) => canPlaceHere(i, nowPlayer)) && !isGameFinished
    const oCount = cells.filter(cell => cell === 'O').length
    const xCount = cells.filter(cell => cell === 'X').length
    const winnerText = () => {
        if (oCount > xCount) return `O win`
        else if (xCount > oCount) return `X win`
        else return 'draw'
    }
    const winner = winnerText()

    return { cells, winner,nowPlayer, oCount, xCount, isGameFinished, isPassRequired, cellClick, passTurn, resetBoard}
}