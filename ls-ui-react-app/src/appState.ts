import React from "react";
import {CompilationResult} from "./slices";


// State representing the the state of the whole page. It has two optional values, on for each view of the page.
//
class AppState {
    compilationResult? : CompilationResult
    compilationIsLoading : boolean = false
    apiResponse : any
    apiError? : string
    jsonParseError? : string
}

interface AppStateProps {
    appState : AppState;
    setAppState : React.Dispatch<AppState>
}

export { AppState }
export type { AppStateProps }

