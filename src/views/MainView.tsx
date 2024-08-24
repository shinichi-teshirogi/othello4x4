import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Board } from "../components/Board";

export const MainView = () => {
    return (
        <Box textAlign="center">
            <Heading>Othello</Heading>
            <Flex>
                <Spacer />
                <Board />
                <Spacer />
            </Flex>
        </Box>
    )
}