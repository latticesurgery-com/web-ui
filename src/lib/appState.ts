import React from "react"
import { ApiResponse } from "./apiResponses"

export class AppState {
    compilationIsLoading: boolean = false
    apiResponse: ApiResponse = null
    repeats?: number = 1
}

export interface AppStateProps {
    appState: AppState
    setAppState: React.Dispatch<AppState>
}
