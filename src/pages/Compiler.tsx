import { useState } from "react"
import { AppState } from "../lib/appState"
import isDevMode from "../lib/isDevMode"
import LatticeView from "../components/sections/LatticeView"
import { CompilationResultSuccess, ResponseError } from "../lib/apiResponses"
import { Stack, Box, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"
import CircuitSelect from "../components/sections/CircuitSelect"

const CompilerPage = (): JSX.Element => {
    const [appState, setAppState] = useState(new AppState())

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
                <CircuitSelect appState={appState} setAppState={setAppState} />
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
                    <LatticeView
                        compilationResult={appState.apiResponse}
                        repeats={appState.repeats} // defaults to 1 if not set
                    />
                )}
            </Stack>
        </>
    )
}

export default CompilerPage
