import { useState } from "react"
import { AppState } from "../appState"
import LatticeView from "../components/sections/LatticeView"
import {
    JsonParseError,
    ApiHttpError,
    CompilationResultSuccess,
    NoServerResponse,
    CompilerError,
} from "../apiResponses"
import { Stack, Box, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"
import CircuitSelect from "../components/sections/CircuitSelect"
import { useSearchParams } from "react-router-dom"

const CompilerPage = (): JSX.Element => {
    const [appState, setAppState] = useState(new AppState())

    const [searchParams] = useSearchParams()
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
                <CircuitSelect
                    appState={appState}
                    setAppState={setAppState}
                    isDevMode={isDevMode}
                />
            </Box>
            <Stack mt={10} spacing={5}>
                {appState.apiResponse instanceof ApiHttpError && (
                    <Alert w={{ base: "100%", sm: "80%", md: "65%" }} mx={"auto"} status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>{"API Status: " + appState.apiResponse.code}</AlertTitle>
                        <AlertDescription>{appState.apiResponse.msg}</AlertDescription>
                    </Alert>
                )}

                {appState.apiResponse instanceof CompilerError && (
                    <Alert w={{ base: "100%", sm: "80%", md: "65%" }} mx={"auto"} status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>Compiler Error!</AlertTitle>
                        <AlertDescription>{`${appState.apiResponse.msg}: ${appState.apiResponse.errortype}`}</AlertDescription>
                    </Alert>
                )}

                {appState.apiResponse instanceof JsonParseError && (
                    <Alert w={{ base: "100%", sm: "80%", md: "65%" }} mx={"auto"} status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>Failed to process results!</AlertTitle>
                        <AlertDescription>{appState.apiResponse.msg}</AlertDescription>
                    </Alert>
                )}

                {appState.apiResponse instanceof NoServerResponse && (
                    <Alert w={{ base: "100%", sm: "80%", md: "65%" }} mx={"auto"} status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>Server failed to respond!</AlertTitle>
                        <AlertDescription>{appState.apiResponse.response}</AlertDescription>
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
