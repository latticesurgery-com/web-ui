import React, { useState } from "react"
import {
    Box,
    Button,
    Checkbox,
    Flex,
    HStack,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Text,
    VStack,
} from "@chakra-ui/react"
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
    FastSlicerOptions,
    LayoutType,
    LitinskiCompilationOptions,
} from "../../../lib/compilationOptions"
import { Slices } from "../../../lib/slices"

interface CompilationOptionsSelectorProps {
    compilationOptions: CompilationOptions
    setCompilationOptions: React.Dispatch<CompilationOptions>
}

const CompilationOptionsSelector = ({
    compilationOptions,
    setCompilationOptions,
}: CompilationOptionsSelectorProps) => {
    const updateFastSlicerOptions = (fastSlicerOptions: FastSlicerOptions) =>
        setCompilationOptions({ ...compilationOptions, fastSlicerOptions })
    const updateLitinskiCompilationOptions = (
        litinskiCompilationOptions: LitinskiCompilationOptions
    ) => setCompilationOptions({ ...compilationOptions, litinskiCompilationOptions })

    return (
        <VStack>
            <Select>
                <option
                    onClick={() =>
                        setCompilationOptions({ ...compilationOptions, kind: "FastSlicerOptions" })
                    }
                >
                    Fast Slicer with direct compilation via ZX
                </option>
                <option
                    onClick={() =>
                        setCompilationOptions({
                            ...compilationOptions,
                            kind: "LitinskiCompilationOptions",
                        })
                    }
                >
                    Litinski style compilation via Pauli Rotations
                </option>
            </Select>
            {compilationOptions.kind === "FastSlicerOptions" ? (
                <>
                    <Text>
                        <b>Note:</b> If submitting .qasm, the fast slicer only supports{" "}
                        <Link
                            color="teal.500"
                            href="https://github.com/latticesurgery-com/liblsqecc#qasm-support-highly-experimental/"
                            target="_blank"
                            isExternal
                        >
                            a very small subset
                        </Link>
                        .
                    </Text>
                    <HStack>
                        <Text>Layout:</Text>
                        <Select
                            defaultValue={
                                LayoutType[compilationOptions.fastSlicerOptions.layoutType]
                            }
                        >
                            {Object.keys(LayoutType)
                                .filter((v) => isNaN(Number(v)))
                                .map((item) => (
                                    <option
                                        key={item}
                                        onClick={() =>
                                            updateFastSlicerOptions({
                                                ...compilationOptions.fastSlicerOptions,
                                                layoutType:
                                                    LayoutType[item as keyof typeof LayoutType],
                                            })
                                        }
                                    >
                                        {item}
                                    </option>
                                ))}
                        </Select>
                        <Text>Apply corrective terms:</Text>
                        <Select
                            defaultValue={
                                CorrectiveTermBehaviour[
                                    compilationOptions.fastSlicerOptions.correctiveTermBehaviour
                                ]
                            }
                        >
                            {Object.keys(CorrectiveTermBehaviour)
                                .filter((v) => isNaN(Number(v)))
                                .map((item) => (
                                    <option
                                        key={item}
                                        onClick={() =>
                                            updateFastSlicerOptions({
                                                ...compilationOptions.fastSlicerOptions,
                                                correctiveTermBehaviour:
                                                    CorrectiveTermBehaviour[
                                                        item as keyof typeof CorrectiveTermBehaviour
                                                    ],
                                            })
                                        }
                                    >
                                        {item}
                                    </option>
                                ))}
                        </Select>
                    </HStack>
                </>
            ) : (
                <Checkbox
                    isChecked={
                        compilationOptions.litinskiCompilationOptions.doStabilizerCommutingTransform
                    }
                    onChange={(e) =>
                        updateLitinskiCompilationOptions({
                            ...compilationOptions.litinskiCompilationOptions,
                            doStabilizerCommutingTransform: e.target.checked,
                        })
                    }
                >
                    <Text as={"span"}>Pi/4 removing transform</Text>
                </Checkbox>
            )}
        </VStack>
    )
}

interface EmscriptenSlicerResult {
    err: string
    exit_code: number
    output: string
}

const runCompilation = async (
    setAppState: React.Dispatch<AppState>,
    fileContents: string,
    compilationOptions: CompilationOptions,
    extension: string,
    repeats: number
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
            compilationOptions.litinskiCompilationOptions,
            repeats
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

const CircuitSelect = ({ appState, setAppState, repeats, setRepeats }: CircuitSelectProps) => {
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
            await runCompilation(
                setAppState,
                data as string,
                compilationOptions,
                extension,
                repeats
            )
        }
    }

    const onExampleCircuitSelect = async (example: string) => {
        const file_url = `${process.env.PUBLIC_URL}/assets/demo_circuits/${example}`
        const data = await fetch(file_url).then((response) => response.text())
        if (data) {
            await runCompilation(setAppState, data as string, compilationOptions, "qasm", repeats)
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
            {isDevMode() && (
                <Box p="3" rounded="lg" borderWidth="3px" borderColor="#98ff98">
                    <Flex gap="2">
                        <Text margin="auto">Repeats</Text>
                        <NumberInput
                            w="120px"
                            defaultValue={repeats}
                            onChange={(value) => {
                                setRepeats(parseInt(value))
                            }}
                            isDisabled={appState.compilationIsLoading}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Flex>
                </Box>
            )}
        </Flex>
    )
}

export default CircuitSelect
