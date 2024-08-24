import { Button } from "@chakra-ui/react"
import { CellText } from "../types/CellText"


type Props = {
    text: CellText
    onClick: () => void
}

export const Cell = ({ text, onClick}: Props) => {
    return (
        <Button m={1} onClick={onClick} textColor={text === 'O' ? 'red': 'blue'}>
            {text}
        </Button>
    )
}