import { useEffect, useState } from "react"
import { AppState } from "../lib/appState"
import isDevMode from "../lib/isDevMode"
import LatticeView from "../components/sections/LatticeView"
import { CompilationResultSuccess, ResponseError } from "../lib/apiResponses"
import {
    Stack,
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Center,
    Text,
    Link,
    Button,
} from "@chakra-ui/react"
import CircuitSelect from "../components/sections/CircuitSelect"

// Let ts know about this global variable> It is at some point defined in lsqecc_emscripten.js
// var LsqeccModule: () => Promise<any>

const CompilerPage = (): JSX.Element => {
    const [appState, setAppState] = useState(new AppState())
    const [repeats, setRepeats] = useState(0)

    // Delicate section to load the emscripten module
    useEffect(() => {
        console.log("Running setup code")
        const scriptElement = document.createElement("script")
        document.head.appendChild(scriptElement)
        scriptElement.type = "text/javascript"
        scriptElement.src = "lsqecc_emscripten.js"
    }, [])

    return (
        <>
            {isDevMode() && (
                <Alert mt={10} status="warning">
                    <AlertIcon />
                    <AlertTitle>Dev Mode enabled!</AlertTitle>
                    <AlertDescription>
                        Some features are under development and may break at any time.
                    </AlertDescription>
                </Alert>
            )}
            <Box mt={10}>
                <CircuitSelect
                    appState={appState}
                    setAppState={setAppState}
                    repeats={repeats}
                    setRepeats={setRepeats}
                />
            </Box>
            <Stack mt={10} spacing={5}>
                {appState.apiResponse instanceof ResponseError && (
                    <Alert w={{ base: "100%", sm: "80%", md: "65%" }} mx={"auto"} status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>{appState.apiResponse.title}</AlertTitle>
                        <AlertDescription>{appState.apiResponse.msg}</AlertDescription>
                    </Alert>
                )}
                <Center>
                    <Text fontSize={"xl"}>
                        You are trying a demo. For the full functionality check out our&nbsp;
                        <Link
                            color="teal.500"
                            href="https://github.com/latticesurgery-com/"
                            isExternal
                        >
                            GitHub
                        </Link>
                        .
                    </Text>
                    <Button
                        onClick={() => {
                            // @ts-ignore
                            const p = LsqeccModule()
                            p.then((loadedModule: any) => {
                                console.log(
                                    JSON.stringify(
                                        loadedModule.run_slicer_program_from_strings(
                                            "--compactlayout",
                                            "DeclareLogicalQubitPatches 0,1\n"
                                        )
                                    )
                                )
                            })
                        }}
                    >
                        Run Emscripten
                    </Button>
                </Center>
                {appState.apiResponse instanceof CompilationResultSuccess && (
                    <LatticeView compilationResult={appState.apiResponse} />
                )}
            </Stack>
        </>
    )
}

export default CompilerPage
