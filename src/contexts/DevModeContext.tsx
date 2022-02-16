import React from "react"

interface DevModeContextInterface {
    isDevMode: boolean,
    setIsDevMode: (value: boolean) => void
}
// <DevModeContextInterface | null>(null)
export const DevModeContext = React.createContext<any>({} as any)

// Alternatively: React.PropsWithChildren<Record<never, never>>
const DevModeContextProvider = (props: React.PropsWithChildren<{}>) => {
    const [isDevMode, setIsDevMode] = React.useState(false)
    return (
        <DevModeContext.Provider
            value={{
                isDevMode,
                setIsDevMode,
            }}
        >
            {props.children}
        </DevModeContext.Provider>
    )
}

export default DevModeContextProvider
