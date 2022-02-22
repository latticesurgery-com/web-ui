import React from "react"
import { ApiResponse } from "./apiResponses"

class AppState {
    compilationIsLoading: boolean = false
    apiResponse: ApiResponse = null
}

interface AppStateProps {
    appState: AppState
    setAppState: React.Dispatch<AppState>
    isDevMode?: boolean
}

export { AppState }
export type { AppStateProps }
