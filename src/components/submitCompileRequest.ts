import { AppStateProps } from "../appState"
import queryString from "query-string"
import { CompilationResult } from "../slices"
import axios from "axios"
import {
    JsonParseError,
    ApiHttpError,
    CompilationResultSuccess,
    NoServerResponse,
    CompilerError,
} from "../apiResponses"

const submitCompileRequest = (
    { appState, setAppState }: AppStateProps,
    circuitStr: string,
    doLitinskiTransform: boolean,
    repeats: number
) => {
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
            } else {
                try {
                    const responseJson = JSON.parse(response.data) as CompilationResult
                    // Extend the slices by
                    const REPEATS = repeats
                    responseJson.slices.forEach((slice, slice_idx) => {
                        slice.forEach((row, row_idx) => {
                            for (let i = 0; i < REPEATS; i++) {
                                responseJson.slices[slice_idx][row_idx] =
                                    responseJson.slices[slice_idx][row_idx].concat(row)
                            }
                        })
                        for (let i = 0; i < REPEATS; i++) {
                            responseJson.slices[slice_idx] =
                                responseJson.slices[slice_idx].concat(slice)
                        }
                    })
                    setAppState({
                        apiResponse: new CompilationResultSuccess(
                            responseJson.slices,
                            responseJson.compilation_text
                        ),
                        compilationIsLoading: false,
                    })
                } catch (error) {
                    setAppState({
                        apiResponse: new JsonParseError((error as Error).toString()),
                        compilationIsLoading: false,
                    })
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
            } else {
                setAppState({
                    // apiResponse: new ApiHttpError((error as Error).toString()),
                    apiResponse: new NoServerResponse("Server did not respond"),
                    compilationIsLoading: false,
                })
            }
        })
}

export default submitCompileRequest
