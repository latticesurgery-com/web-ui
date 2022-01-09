/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"

import { AppStateProps } from "../../appState"
import Loader from "../../components/Loader"
import { CompilationResult } from "../../slices"

import SelectExampleCircuit from "./SelectExampleCircuit"
import axios from "axios"
import {
    JsonParseError,
    ApiHttpError,
    CompilationResultSuccess,
    NoServerResponse,
    CompilerError,
} from "../../apiResponses"
import queryString from "query-string"

const UploadACircuit = ({ appState, setAppState }: AppStateProps) => {
    const [uploadIsLoading, setUploadIsLoading] = React.useState(false)

    const [doLitinskiTransform, setDoLitinskiTransform] = React.useState(true)

    const [circuitStr, setCircuitStr] = React.useState<string | null>(null)

    const readCircuitFile = (file: File | undefined | null) => {
        if (!file) {
            setCircuitStr(null)
            return
        }

        const fileReader = new FileReader()
        fileReader.onloadend = () => setCircuitStr(fileReader.result as string)
        fileReader.readAsText(file)
    }

    // To Do: forbid compile request submit with empty circuit
    const submitCompileRequest = () => {
        setUploadIsLoading(true)
        const queryStringMap = queryString.parse(window.location.search)

        const apiUrl = queryStringMap.localapi
            ? `http://localhost:${queryStringMap.port || 9876}/compile`
            : "https://api.latticesurgery.com/compile"

        // Modify State on Compile Request Submit
        setAppState({
            ...appState,
            compilationIsLoading: true,
            apiResponse: null,
        })

        // Async JS HTTP request to API endpoint, apiUrl
        axios
            .post(apiUrl, {
                circuit_source: "str",
                circuit: circuitStr,
                apply_litinski_transform: doLitinskiTransform,
            })
            .then((response) => {
                if (response.data.errorMessage) {
                    const errortype = response.data.errorType
                    const msg = response.data.errorMessage
                    setAppState({
                        apiResponse: new CompilerError(errortype, msg),
                        compilationIsLoading: false,
                    })
                    setUploadIsLoading(false)
                } else {
                    try {
                        const responseJson = JSON.parse(response.data) as CompilationResult
                        setAppState({
                            apiResponse: new CompilationResultSuccess(
                                responseJson.slices,
                                responseJson.compilation_text
                            ),
                            compilationIsLoading: false,
                        })
                        setUploadIsLoading(false)
                    } catch (error) {
                        setAppState({
                            apiResponse: new JsonParseError((error as Error).toString()),
                            compilationIsLoading: false,
                        })
                        setUploadIsLoading(false)
                    }
                }

                // Catch Axios Errors: API errors -> timeout, error compiling, or no response
            })
            .catch((error) => {
                // needs more testing. First two requests after a long lambda cooldown period result in CORS / Network Errors
                if (error.response) {
                    console.error("AXIOS error:")
                    console.log(error.response.data)
                    console.log(error.response.headers)
                    console.log(error.response.status)
                    const error_code = error.response.status
                    const error_data = error.response.data
                    const error_headers = error.response.headers
                    // var api_error = new ApiHttpError(error_code,error_data,error_headers)
                    setAppState({
                        // apiResponse: new ApiHttpError((error as Error).toString()),
                        apiResponse: new ApiHttpError(error_code, error_data, error_headers),
                        compilationIsLoading: false,
                    })
                    setUploadIsLoading(false)
                } else {
                    setAppState({
                        // apiResponse: new ApiHttpError((error as Error).toString()),
                        apiResponse: new NoServerResponse("Server did not respond"),
                        compilationIsLoading: false,
                    })
                    setUploadIsLoading(false)
                }
            })
    }

    return (
        <div className="mb-3">
            Upload an OpenQASM circuit.
            <>
                <div className="input-group">
                    <input
                        id="circuit"
                        className="form-control circuit"
                        name="circuit"
                        type="file"
                        onChange={(e) => readCircuitFile(e?.target?.files && e.target.files[0])}
                    />
                    <div className="input-group-append">
                        <button
                            css={css`
                                width: 100px;
                            `}
                            className="btn btn-primary"
                            disabled={appState.compilationIsLoading}
                            onClick={() => submitCompileRequest()}
                        >
                            {appState.compilationIsLoading && uploadIsLoading ? (
                                <Loader size={20} color="white" />
                            ) : (
                                "Go!"
                            )}
                        </button>
                    </div>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="litinski_check1"
                        name="litinski"
                        checked={doLitinskiTransform}
                        onChange={(event) => setDoLitinskiTransform(event.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="litinski_check1">
                        Litinski Transform
                    </label>
                </div>
            </>
        </div>
    )
}

const UploadCircuit = ({ appState, setAppState }: AppStateProps) => (
    <>
        <h2 id="get-started" className="scroll-offset">
            Get Started - Upload a circuit
        </h2>
        <hr />
        <UploadACircuit setAppState={setAppState} appState={appState} />
        <SelectExampleCircuit setAppState={setAppState} appState={appState} />
    </>
)

export default UploadCircuit
