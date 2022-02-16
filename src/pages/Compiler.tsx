import { useState, useContext, useEffect } from "react"
import { AppState } from "../appState"
import LatticeView from "../components/sections/LatticeView"
import {
    JsonParseError,
    ApiHttpError,
    CompilationResultSuccess,
    NoServerResponse,
    CompilerError,
} from "../apiResponses"
import {
    Stack,
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Center,
    Text,
} from "@chakra-ui/react"
import CircuitSelect from "../components/sections/CircuitSelect"
import { useLocation, useNavigate } from "react-router-dom"
import { DevModeContext } from "../contexts/DevModeContext"

const CompilerPage = (): JSX.Element => {
    const [appState, setAppState] = useState(new AppState())

    const path = useLocation()
    const { isDevMode, setIsDevMode } = useContext(DevModeContext)
    const query = new URLSearchParams(path.search)
    const mode = query.get("dev")
    console.log("MODE",mode)
    console.log("dev mode???",isDevMode)

    let navigate = useNavigate()
    useEffect(() => {
        if (mode == "true") {
            setIsDevMode(true)
            navigate(path.pathname)
        } else if (mode == "false") {
            setIsDevMode(false)
            navigate(path.pathname)
        }
    })

    return (
        <>
            {isDevMode && (
                <Box w="100%" bg="#98ff98" color="black" rounded="2xl" p="4">
                    <Center>
                        <Text>
                            Dev Mode is enabled. Some features are under development and may break
                            at any time. To disable, include dev=false in the query string by
                            pasting: ?dev=false to the end of the url
                        </Text>
                    </Center>
                </Box>
            )}

            <Box mt={10}>
                <CircuitSelect appState={appState} setAppState={setAppState} />
            </Box>
            <Stack mt={10} spacing={5}>
                {appState.apiResponse instanceof ApiHttpError && (
                    <Alert w={{ base: "100%", sm: "80%", md: "65%" }} mx={"auto"} status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>{"API Status: " + appState.apiResponse.code}</AlertTitle>
                        <AlertDescription>{appState.apiResponse.msg}</AlertDescription>
                    </Alert>
                )}

                {appState.apiResponse instanceof CompilerError && (
                    <Alert w={{ base: "100%", sm: "80%", md: "65%" }} mx={"auto"} status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>Compiler Error!</AlertTitle>
                        <AlertDescription>{`${appState.apiResponse.msg}: ${appState.apiResponse.errortype}`}</AlertDescription>
                    </Alert>
                )}

                {appState.apiResponse instanceof JsonParseError && (
                    <Alert w={{ base: "100%", sm: "80%", md: "65%" }} mx={"auto"} status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>Failed to process results!</AlertTitle>
                        <AlertDescription>{appState.apiResponse.msg}</AlertDescription>
                    </Alert>
                )}

                {appState.apiResponse instanceof NoServerResponse && (
                    <Alert w={{ base: "100%", sm: "80%", md: "65%" }} mx={"auto"} status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>Server failed to respond!</AlertTitle>
                        <AlertDescription>{appState.apiResponse.response}</AlertDescription>
                    </Alert>
                )}

                {appState.apiResponse instanceof CompilationResultSuccess && (
                    <LatticeView compilationResult={appState.apiResponse} />
                )}
            </Stack>
        </>
    )
}

export default CompilerPage
