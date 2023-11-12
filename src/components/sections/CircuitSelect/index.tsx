import { useState } from "react"
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { IoChevronDownSharp } from "react-icons/io5"
import { useSearchParams } from "react-router-dom"
import Slicer from "@lattice-surgery/liblsqecc"

import FileUploader from "./FileUploader"
import submitCompileRequest from "lib/submitCompileRequest"
import CompilationOptionsSelector from "./CompilationOptionsSelector"
import { CompilationResultSuccess, ResponseError } from "lib/apiResponses"
import { defaultCompilationOptions } from "lib/compilationOptions"

import type { AppState } from "lib/appState"
import type { CompilationOptions } from "lib/compilationOptions"
import type { Slices } from "lib/slices"

type CircuitSelectProps = {
    appState: AppState
    setAppState: React.Dispatch<AppState>
}

const runCompilation = async (
    setAppState: React.Dispatch<AppState>,
    fileContents: string,
    compilationOptions: CompilationOptions,
    extension: string,
    isDevMode: boolean
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
        const loadedModule = await Slicer.load()

        if (isDevMode) console.log(`Compiling in browser with input:\n${fileContents}`)
        const emscriptenResult = loadedModule.run(
            fileContents,
            extension === "qasm" ? "qasm" : "lli",
            fastSlicerOptions.layoutType,
            fastSlicerOptions.correctiveTermBehaviour
        )

        if (isDevMode) console.log(emscriptenResult)

        try {
            if (emscriptenResult.exit_code === 0) {
                setAppState({
                    compilationIsLoading: false,
                    apiResponse: new CompilationResultSuccess({
                        slices: JSON.parse(emscriptenResult.output) as Slices,
                        compilation_text:"Emscripten Success"
                }),
                })
            } else {
                setAppState({
                    compilationIsLoading: false,
                    apiResponse: new ResponseError(
                        `Compiler returned non zero exit code ${emscriptenResult.exit_code}`,
                        `Compiler Error: ${emscriptenResult.err}\n` +
                            (isDevMode ? `Compiler Output: ${emscriptenResult.output}` : "")
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

const CircuitSelect = ({ appState, setAppState }: CircuitSelectProps) => {
    const [searchParams] = useSearchParams()
    const [compilationOptions, setCompilationOptions] = useState(defaultCompilationOptions)

    const isDevMode = searchParams.get("dev") === "true"

    const readFile = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsText(file)
        })
    }

    const onFileAccepted = async (file: File) => {
        const data = (await readFile(file)) as string
        const extension: string = file.name.split(".").pop() || ""
        if (extension === "json" || "[{".includes(data[0])) {
            const json_data = JSON.parse(data)
            if (Object.prototype.hasOwnProperty.call(json_data, "compilation_text")) {
                setAppState({
                    apiResponse: new CompilationResultSuccess(json_data),
                    compilationIsLoading: false,
                })
            } else {
                setAppState({
                    apiResponse: new CompilationResultSuccess({compilation_text: "", slices: json_data}),
                    compilationIsLoading: false,
                })
            }
        } else {
            await runCompilation(
                setAppState,
                data as string,
                compilationOptions,
                extension,
                isDevMode
            )
        }
    }

    const onExampleCircuitSelect = async (example: string) => {
        const file_url = `/assets/demo_circuits/${example}`
        const data = await fetch(file_url).then((response) => response.text())
        if (data) {
            await runCompilation(setAppState, data as string, compilationOptions, "qasm", isDevMode)
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
