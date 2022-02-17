import React from "react"

type DevModeContextType = {
    isDevMode: boolean
    setIsDevMode: (value: boolean) => void
}

const defaultContext = {
    isDevMode: false,
    setIsDevMode: () => null,
}

export const DevModeContext = React.createContext<DevModeContextType>(defaultContext)

const DevModeContextProvider = (props: React.PropsWithChildren<Record<never, never>>) => {
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
