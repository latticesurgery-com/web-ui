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
import { Container, Stack, Box } from "@chakra-ui/react"
import Navbar from "../components/UI/Navbar"
import CircuitSelect from "../components/sections/CircuitSelect"

const CompilerPage = (): JSX.Element => {
    const [appState, setAppState] = useState(new AppState())
    return (
        <>
            <Container maxW="container.xl">
                <Navbar />
                <Box mt={10}>
                    <CircuitSelect appState={appState} setAppState={setAppState} />
                </Box>
            </Container>
            <Stack mt={10} spacing={5} px={10}>
                {appState.apiResponse instanceof ApiHttpError && (
                    <div className="alert alert-danger">
                        <div>{"API Status: " + appState.apiResponse.code}</div>
                        <div>{appState.apiResponse.msg}</div>
                    </div>
                )}

                {appState.apiResponse instanceof CompilerError && (
                    <div className="alert alert-danger">
                        <div>{"API Status: 200"}</div>
                        <div>Compiler Error:</div>
                        <div>{appState.apiResponse.msg}</div>
                        <div>{appState.apiResponse.errortype}</div>
                    </div>
                )}

                {appState.apiResponse instanceof JsonParseError && (
                    <div className="alert alert-danger">
                        <div>{"API Status: 200"}</div>
                        <div>{appState.apiResponse.msg}</div>
                    </div>
                )}

                {appState.apiResponse instanceof NoServerResponse && (
                    <div className="alert alert-danger">
                        <div>{appState.apiResponse.response}</div>
                    </div>
                )}

                {/* If compilationResult changes from undefined to true (instanciated), render result in Lattice View */}
                {appState.apiResponse instanceof CompilationResultSuccess && (
                    <LatticeView compilationResult={appState.apiResponse} />
                )}
            </Stack>
        </>
    )
}

export default CompilerPage
