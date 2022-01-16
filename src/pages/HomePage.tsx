/** @jsxImportSource @emotion/react */
import { AppStateProps } from "../appState"
import LatticeView from "../components/sections/LatticeView"
import UploadCircuit from "../components/sections/UploadCircuit"
import {
    JsonParseError,
    ApiHttpError,
    CompilationResultSuccess,
    NoServerResponse,
    CompilerError,
} from "../apiResponses"

const HomePage = ({ appState, setAppState }: AppStateProps): JSX.Element => {
    return (
        <>
            <div className="main">
                <section>
                    <div>
                        {/* Indicate loading/calculating with a spinner and text */}
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
                    </div>
                </section>
            </div>
        </>
    )
}

export default HomePage
