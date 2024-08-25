import { Box, Button, Heading } from '@chakra-ui/react'
import { Cell } from './Cell'
import { useGameController } from '../hooks/useGameController'

export const Board = () => {
    const { cells, winner, nowPlayer, isWin, cellClick, passTurn, isPassRequired } = useGameController()

    return (
        <Box>
            <Heading>{isWin ? `${winner} is win!` : `${nowPlayer}'s turn`}</Heading>
            <Box style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 48px)',
                gap: '0px',
            }}>
            {cells.map((cell, index) => {
                return (
                    <Cell key={index} text={cell} onClick={() => cellClick(index)} />
                )
            })}
            </Box>
            <Box>
                <Button onClick={passTurn} isDisabled={!isPassRequired} mt={4}>Pass</Button>
            </Box>
        </Box>
    )
}