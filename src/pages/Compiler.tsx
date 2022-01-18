import { useState } from "react"
import { AppState } from "../appState"
import LatticeView from "../components/sections/LatticeView"
import UploadCircuit from "../components/sections/UploadCircuit"
import {
    JsonParseError,
    ApiHttpError,
    CompilationResultSuccess,
    NoServerResponse,
    CompilerError,
} from "../apiResponses"
import { Container, Stack } from "@chakra-ui/react"
import Navbar from "../components/UI/Navbar"

const CompilerPage = (): JSX.Element => {
    const [appState, setAppState] = useState(new AppState())
    return (
        <>
            <Container maxW="container.xl">
                <Navbar />
            </Container>
            <Stack mt={10} spacing={5} px={10}>
                <UploadCircuit appState={appState} setAppState={setAppState} />
                {appState.compilationIsLoading && (
                    <div>
                        <div className="spinner-border text-success" role="status"></div>
                        <b>Processing...</b>
                    </div>
                )}

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
