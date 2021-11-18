import React from "react";
import {CompilationResult} from "./slices";


// State representing the the state of the whole page. It has two optional values, on for each view of the page.
//
class AppState {
    compilationResult? : CompilationResult
    errorMsg? : string // An optional error message to show to the user
    compilationIsLoading : boolean = false
    request? : boolean = false
}

interface AppStateProps {
    appState : AppState;
    setAppState : React.Dispatch<AppState>
}

export { AppState }
export type { AppStateProps }

