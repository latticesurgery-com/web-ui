import { AppStateProps } from "../appState"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"
import axios from "axios"

import { CompilationResult } from "../slices"
import {
    JsonParseError,
    ApiHttpError,
    CompilationResultSuccess,
    NoServerResponse,
    CompilerError,
} from "../apiResponses"
import queryString from "query-string"
import Loader from "./Loader"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectExampleCircuit = ({ appState, setAppState }: AppStateProps) => {
    const [exampleIsLoading, setExampleIsLoading] = React.useState(false)

    const [doLitinskiTransform, setDoLitinskiTransform] = React.useState(true)

    const [circuitStr, setCircuitStr] = React.useState<string | null>(null)

    const [exampleCircuit, setExampleCircuit] = React.useState<string>("bell_pair.qasm")

    // Handle Dropdown Select change event
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setExampleCircuit(value)
        readCircuitFile(value)
    }

    // set circuitStr to the selected Example Circuit
    const readCircuitFile = (filename: string) => {
        const file_url = `${process.env.PUBLIC_URL}/assets/demo_circuits/${filename}`
        fetch(file_url)
            .then(function (response) {
                return response.text()
            })
            .then(function (data) {
                setCircuitStr(data)
            })
    }
    readCircuitFile(exampleCircuit)

    // To Do: forbid compile request submit with empty circuit
    const submitCompileRequest = () => {
        setExampleIsLoading(true)
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
                    setExampleIsLoading(false)
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
                        setExampleIsLoading(false)
                    } catch (error) {
                        setAppState({
                            apiResponse: new JsonParseError((error as Error).toString()),
                            compilationIsLoading: false,
                        })
                        setExampleIsLoading(false)
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
                    setExampleIsLoading(false)
                } else {
                    setAppState({
                        // apiResponse: new ApiHttpError((error as Error).toString()),
                        apiResponse: new NoServerResponse("Server did not respond"),
                        compilationIsLoading: false,
                    })
                    setExampleIsLoading(false)
                }
            })
    }

    return (
        <div>
            Or choose from the following example circuits:
            <div>
                <div className="input-group">
                    <select
                        className="form-select"
                        css={css`
                            max-width: 250px;
                        `}
                        name="circuit"
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select a Circuit
                        </option>
                        <option value="bell_pair.qasm">Bell Pair</option>
                        <option value="nontrivial_state.qasm">Non-trivial State</option>
                    </select>
                    <div className="input-group-append">
                        {/* <input type="submit" className="btn btn-info" value="Go!"/> */}
                        {/* When implemented, will be a button with onClick rather than html input */}
                        <button
                            css={css`
                                width: 100px;
                            `}
                            className="btn btn-primary"
                            disabled={appState.compilationIsLoading}
                            onClick={() => submitCompileRequest()}
                        >
                            {appState.compilationIsLoading && exampleIsLoading ? (
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
                        id="litinski_check2"
                        name="litinski"
                        checked={doLitinskiTransform}
                        onChange={(event) => setDoLitinskiTransform(event.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="litinski_check2">
                        Litinski Transform
                    </label>
                </div>
            </div>
        </div>
    )
}

export default SelectExampleCircuit
