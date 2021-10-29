import React from "react";


enum PageChoice {
    UploadCircuit,
        LatticeView
}

class AppState {
    pageChoice : PageChoice = PageChoice.UploadCircuit;
    slices? : any
    errorMsg? : string
}

interface AppStateProps {
    appState : AppState;
    setAppState : React.Dispatch<AppState>
}

export {PageChoice, AppState}
export type { AppStateProps }

