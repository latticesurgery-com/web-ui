import { useState } from "react"
import { AppState } from "lib/appState"
import { useSearchParams } from "react-router-dom"

import LatticeView from "components/sections/LatticeView"
import { CompilationResultSuccess, ResponseError } from "lib/apiResponses"
import {
    Stack,
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Center,
    Text,
    Link,
} from "@chakra-ui/react"
import CircuitSelect from "components/sections/CircuitSelect"

const CompilerPage = (): JSX.Element => {
    const [searchParams] = useSearchParams()
    const [appState, setAppState] = useState(new AppState())

    const isDevMode = searchParams.get("dev") === "true"

    return (
        <>
            {isDevMode && (
                <Alert mt={10} status="warning">
                    <AlertIcon />
                    <AlertTitle>Dev Mode enabled!</AlertTitle>
                    <AlertDescription>
                        Some features are under development and may break at any time.
                    </AlertDescription>
                </Alert>
            )}
            <Box mt={10}>
                <CircuitSelect appState={appState} setAppState={setAppState} />
            </Box>
            <Stack mt={10} spacing={5}>
                {appState.apiResponse instanceof ResponseError && (
                    <Alert w={{ base: "100%", sm: "80%", md: "65%" }} mx={"auto"} status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>{appState.apiResponse.title}</AlertTitle>
                        <AlertDescription>
                            {appState.apiResponse.msg
                                .split("\n")
                                .flatMap((line, n) => [
                                    <span key={`line-${n}`}>{line}</span>,
                                    <br key={`br-${n}`} />,
                                ])}
                        </AlertDescription>
                    </Alert>
                )}
                <Center>
                    <Text fontSize={"xl"}>
                        You are trying a demo. For the full functionality check out our&nbsp;
                        <Link
                            color="teal.500"
                            href="https://github.com/latticesurgery-com/"
                            isExternal
                        >
                            GitHub
                        </Link>
                        .
                    </Text>
                </Center>
                {appState.apiResponse instanceof CompilationResultSuccess && (
                    <LatticeView compilationResult={appState.apiResponse} />
                )}
            </Stack>
        </>
    )
}

export default CompilerPage
