import { useState, useEffect } from "react"
import { AppState } from "../lib/appState"
import isDevMode from "../lib/isDevMode"
import LatticeView from "../components/sections/LatticeView"
import { CompilationResultSuccess, ResponseError } from "../lib/apiResponses"
import {
    Stack,
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
    Center,
} from "@chakra-ui/react"
import CircuitSelect from "../components/sections/CircuitSelect"

const CompilerPage = (): JSX.Element => {
    const [appState, setAppState] = useState(new AppState())
    const [repeats, setRepeats] = useState(0)
    const [showCircuitSelect, setShowCircuitSelect] = useState(true)

    useEffect(() => {
        if (appState.apiResponse instanceof CompilationResultSuccess) {
            setShowCircuitSelect(false)
        }
    }, [appState])

    return (
        <>
            {isDevMode() && (
                <Alert mt={10} status="warning">
                    <AlertIcon />
                    <AlertTitle>Dev Mode enabled!</AlertTitle>
                    <AlertDescription>
                        Some features are under development and may break at any time.
                    </AlertDescription>
                </Alert>
            )}

            <Box mt={10}>
                {showCircuitSelect ? (
                    <CircuitSelect
                        appState={appState}
                        setAppState={setAppState}
                        repeats={repeats}
                        setRepeats={setRepeats}
                    />
                ) : (
                    <Center>
                        <Button size="lg" onClick={() => setShowCircuitSelect(true)}>
                            New Circuit
                        </Button>
                    </Center>
                )}
            </Box>
            <Stack mt={10} spacing={5}>
                {appState.apiResponse instanceof ResponseError && (
                    <Alert w={{ base: "100%", sm: "80%", md: "65%" }} mx={"auto"} status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>{appState.apiResponse.title}</AlertTitle>
                        <AlertDescription>{appState.apiResponse.msg}</AlertDescription>
                    </Alert>
                )}

                {appState.apiResponse instanceof CompilationResultSuccess && (
                    <LatticeView compilationResult={appState.apiResponse} />
                )}
            </Stack>
        </>
    )
}

export default CompilerPage
