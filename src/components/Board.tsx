import { Box, Heading } from '@chakra-ui/react'
import { Cell } from './Cell'
import { useGameController } from '../hooks/useGameController'

export const Board = () => {
    const { cells, winner, nowPlayer, isWin, cellClick } = useGameController()
    return (
        <Box>
            <Heading>{isWin ? `${winner} is win!` : `${nowPlayer}'s turn`}</Heading>
            <Box>
                <Cell text={cells[0]} onClick={() => cellClick(0)} />
                <Cell text={cells[1]} onClick={() => cellClick(1)} />
                <Cell text={cells[2]} onClick={() => cellClick(2)} />
                <Cell text={cells[3]} onClick={() => cellClick(3)} />
            </Box>
            <Box>
                <Cell text={cells[4]} onClick={() => cellClick(4)} />
                <Cell text={cells[5]} onClick={() => cellClick(5)} />
                <Cell text={cells[6]} onClick={() => cellClick(6)} />
                <Cell text={cells[7]} onClick={() => cellClick(7)} />
            </Box>
            <Box>
                <Cell text={cells[8]} onClick={() => cellClick(8)} />
                <Cell text={cells[9]} onClick={() => cellClick(9)} />
                <Cell text={cells[10]} onClick={() => cellClick(10)} />
                <Cell text={cells[11]} onClick={() => cellClick(11)} />
            </Box>
            <Box>
                <Cell text={cells[12]} onClick={() => cellClick(12)} />
                <Cell text={cells[13]} onClick={() => cellClick(13)} />
                <Cell text={cells[14]} onClick={() => cellClick(14)} />
                <Cell text={cells[15]} onClick={() => cellClick(15)} />
            </Box>
        </Box>
    )
}