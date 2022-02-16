import React from "react"

type DevModeContextType = {
    isDevMode: boolean
    setIsDevMode: (value: boolean) => void
}

const defaultContext = {
    isDevMode: false,
    setIsDevMode: () => null
}

// <DevModeContextInterface | null>(null)
export const DevModeContext = React.createContext<DevModeContextType>(defaultContext)

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
