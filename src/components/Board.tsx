import { Box, Button, Heading } from '@chakra-ui/react'
import { Cell } from './Cell'
import { useGameController } from '../hooks/useGameController'

export const Board = () => {
    const { cells, winner, nowPlayer, oCount, xCount, isGameFinished, isPassRequired, cellClick, passTurn, resetBoard } = useGameController()

    return (
        <Box>
            <Heading>{isGameFinished ? `${winner}` : `${nowPlayer}'s turn`}</Heading>
            <Box>{`O: ${oCount}  X: ${xCount}`}</Box>
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
                <Button onClick={passTurn} isDisabled={!isPassRequired} m={2}>Pass</Button>
                <Button onClick={resetBoard} isDisabled={!isGameFinished} m={2}>Restart</Button>
            </Box>
        </Box>
    )
}