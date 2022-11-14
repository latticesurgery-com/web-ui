import React, { useState } from "react"
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { IoChevronDownSharp } from "react-icons/io5"
import { AppState } from "../../../lib/appState"
import FileUploader from "./FileUploader"
import submitCompileRequest from "../../../lib/submitCompileRequest"
import isDevMode from "../../../lib/isDevMode"
import { CompilationResultSuccess, ResponseError } from "../../../lib/apiResponses"
import {
    CompilationOptions,
    CorrectiveTermBehaviour,
    defaultCompilationOptions,
    LayoutType,
} from "../../../lib/compilationOptions"
import { Slices } from "../../../lib/slices"
import CompilationOptionsSelector from "./CompilationOptionsSelector"

interface EmscriptenSlicerResult {
    err: string
    exit_code: number
    output: string
}

const runCompilation = async (
    setAppState: React.Dispatch<AppState>,
    fileContents: string,
    compilationOptions: CompilationOptions,
    extension: string
) => {
    // Modify State on Compile Request Submit
    setAppState({
        compilationIsLoading: true,
        apiResponse: null,
    })

    if (compilationOptions.kind == "LitinskiCompilationOptions")
        submitCompileRequest(
            setAppState,
            fileContents,
            compilationOptions.litinskiCompilationOptions
        )
    else {
        const { fastSlicerOptions } = compilationOptions

        // Modify State on Compile Request Submit
        setAppState({
            compilationIsLoading: true,
            apiResponse: null,
        })

        // Run the script
        // @ts-ignore
        const loadedModule = await LsqeccModule()

        const commandLine = [
            fastSlicerOptions.layoutType === LayoutType.Compact ? "--compactlayout" : "",
            extension === "qasm" ? "-q" : "",
            "--cnotcorrections",
            fastSlicerOptions.correctiveTermBehaviour === CorrectiveTermBehaviour.Allways
                ? "always"
                : "never",
        ].join(" ")
        if (isDevMode())
            console.log(`Compiling in browser with args: ${commandLine}\ninput:\n${fileContents}`)
        const emscriptenRawResult = loadedModule.run_slicer_program_from_strings(
            commandLine,
            fileContents
        )
        if (isDevMode()) console.log(emscriptenRawResult)

        const emscriptenResult: EmscriptenSlicerResult = JSON.parse(emscriptenRawResult)

        try {
            if (emscriptenResult.exit_code === 0) {
                setAppState({
                    compilationIsLoading: false,
                    apiResponse: new CompilationResultSuccess(
                        JSON.parse(emscriptenResult.output) as Slices,
                        `Emscripten Success`
                    ),
                })
            } else {
                setAppState({
                    compilationIsLoading: false,
                    apiResponse: new ResponseError(
                        `Compiler returned non zero exit code ${emscriptenResult.exit_code}`,
                        `Compiler Error: ${emscriptenResult.err}\n` +
                            (isDevMode() ? `Compiler Output: ${emscriptenResult.output}` : "")
                    ),
                })
            }
        } catch (err) {
            setAppState({
                compilationIsLoading: false,
                apiResponse: new ResponseError(
                    `JS Exception`,
                    `${err}\nCompiler Error: ${emscriptenResult.err}\nCompiler Output: ${emscriptenResult.output}`
                ),
            })
        }
    }
}

type CircuitSelectProps = {
    appState: AppState
    setAppState: React.Dispatch<AppState>
    repeats: number
    setRepeats: (value: number) => void
}

const CircuitSelect = ({ appState, setAppState }: CircuitSelectProps) => {
    const [compilationOptions, setCompilationOptions] =
        useState<CompilationOptions>(defaultCompilationOptions)
    const readFile = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsText(file)
        })
    }

    const onFileAccepted = async (file: File) => {
        const data = await readFile(file)
        const extension: string = file.name.split(".").pop() || ""
        if (extension === "json") {
            const json_data = JSON.parse(data as string)
            if (Object.prototype.hasOwnProperty.call(json_data, "compilation_text")) {
                setAppState({
                    apiResponse: new CompilationResultSuccess(
                        json_data.slices,
                        json_data.compilation_text
                    ),
                    compilationIsLoading: false,
                })
            } else {
                setAppState({
                    apiResponse: new CompilationResultSuccess(json_data, ""),
                    compilationIsLoading: false,
                })
            }
        } else {
            await runCompilation(setAppState, data as string, compilationOptions, extension)
        }
    }

    const onExampleCircuitSelect = async (example: string) => {
        const file_url = `${process.env.PUBLIC_URL}/assets/demo_circuits/${example}`
        const data = await fetch(file_url).then((response) => response.text())
        if (data) {
            await runCompilation(setAppState, data as string, compilationOptions, "qasm")
        }
    }

    return (
        <Flex gap={5} direction={"column"} align={"center"}>
            <Menu>
                <MenuButton
                    as={Button}
                    size={"lg"}
                    rightIcon={<IoChevronDownSharp />}
                    isLoading={appState.compilationIsLoading}
                >
                    Choose an example circuit
                </MenuButton>
                <MenuList>
                    <MenuItem m={0} onClick={() => onExampleCircuitSelect("bell_pair.qasm")}>
                        Bell Pair
                    </MenuItem>
                    <MenuItem m={0} onClick={() => onExampleCircuitSelect("nontrivial_state.qasm")}>
                        Non-trivial State
                    </MenuItem>
                </MenuList>
            </Menu>
            <Text as={"h3"} fontSize={"lg"} fontWeight={600} letterSpacing={2}>
                OR
            </Text>
            <FileUploader
                onFileAccepted={onFileAccepted}
                isLoading={appState.compilationIsLoading}
            />
            <CompilationOptionsSelector
                compilationOptions={compilationOptions}
                setCompilationOptions={setCompilationOptions}
            />
        </Flex>
    )
}

export default CircuitSelect
