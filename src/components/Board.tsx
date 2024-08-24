import { Box, Heading } from '@chakra-ui/react'
import { Cell } from './Cell'
import { useGameController } from '../hooks/useGameController'

export const Board = () => {
    const { cells, winner, nowPlayer, isWin, cellClick } = useGameController()
    return (
        <Box>
            <Heading>{isWin ? `${winner} is win!` : `${nowPlayer}'s turn`}</Heading>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 48px)',
                gap: '0px',
            }}>
            {cells.map((cell, index) => {
                return (
                    <Cell text={cell} onClick={() => cellClick(index)} />
                )
            })}
            </div>
        </Box>
    )
}