import { AppState } from "./appState"
import queryString from "query-string"
import axios from "axios"
import { CompilationResultSuccess, ResponseError } from "./apiResponses"
import { SimulationMethod } from "./compilationOptions"

import type { CompilationResult } from "./slices"
import type { LitinskiCompilationOptions } from "./compilationOptions"

const API_URL = "https://api.latticesurgery.com/compile"

const submitCompileRequest = async (
    setAppState: React.Dispatch<AppState>,
    circuitStr: string,
    compilationOptions: LitinskiCompilationOptions
) => {
    const queryStringMap = queryString.parse(window.location.search)

    const apiUrl = queryStringMap.localapi
        ? `http://localhost:${queryStringMap.port || 9876}/compile`
        : API_URL

    try {
        const response = await axios.post(apiUrl, {
            circuit_source: "str",
            circuit: circuitStr,
            apply_litinski_transform: compilationOptions.doStabilizerCommutingTransform,
            simulation_method: SimulationMethod[compilationOptions.simulationMethod],
        })

        if (response.data.errorMessage) {
            setAppState({
                apiResponse: new ResponseError(
                    "Compiler Error!",
                    `${response.data.errorType}: ${response.data.errorMessage}`
                ),
                compilationIsLoading: false,
            })
        } else {
            try {
                const responseJson = JSON.parse(response.data) as CompilationResult

                setAppState({
                    apiResponse: new CompilationResultSuccess(responseJson),
                    compilationIsLoading: false,
                })
            } catch (err) {
                let msg
                if (err instanceof Error) msg = err.message
                else msg = String(err)
                setAppState({
                    apiResponse: new ResponseError("Failed to process results!", msg),
                    compilationIsLoading: false,
                })
            }
        }
    } catch (err) {
        if (err instanceof Error) {
            if (axios.isAxiosError(err) && err.response) {
                setAppState({
                    apiResponse: new ResponseError(
                        `API Error: ${err.response.status}`,
                        err.response.data
                    ),
                    compilationIsLoading: false,
                })
            } else {
                setAppState({
                    apiResponse: new ResponseError("Error!", "Server did not respond"),
                    compilationIsLoading: false,
                })
            }
        } else {
            setAppState({
                apiResponse: new ResponseError("Unknown Error!", String(err)),
                compilationIsLoading: false,
            })
        }
    }
}

export default submitCompileRequest
