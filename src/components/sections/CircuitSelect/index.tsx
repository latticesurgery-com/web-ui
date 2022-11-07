import { useState } from "react"
import React from "react"
import {
    Button,
    Checkbox,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    Box,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputField,
    NumberInputStepper,
    NumberInput, Select, HStack, VStack, Link,
} from "@chakra-ui/react"
import { IoChevronDownSharp } from "react-icons/io5"
import { AppState } from "../../../lib/appState"
import FileUploader from "./FileUploader"
import submitCompileRequest from "../../../lib/submitCompileRequest"
import isDevMode from "../../../lib/isDevMode"
import { CompilationResultSuccess } from "../../../lib/apiResponses"
import {
    CompilationOptions,
    CorrectiveTermBehaviour,
    defaultCompilationOptions,
    FastSlicerOptions,
    LayoutType,
    LitinskiCompilationOptions,
} from "../../../lib/compilationOptions"


interface CompilationOptionsSelectorProps {
    compilationOptions: CompilationOptions
    setCompilationOptions: React.Dispatch<CompilationOptions>
}

const CompilationOptionsSelector = ({compilationOptions, setCompilationOptions} : CompilationOptionsSelectorProps) => {

    const updateFastSlicerOptions = (fastSlicerOptions : FastSlicerOptions) =>
        setCompilationOptions({...compilationOptions, fastSlicerOptions})
    const updateLitinskiCompilationOptions= (litinskiCompilationOptions : LitinskiCompilationOptions) =>
        setCompilationOptions({...compilationOptions, litinskiCompilationOptions})

    return <VStack>
        <Select>
            <option
                selected={true}
                onClick={() => setCompilationOptions({ ...compilationOptions, kind: "FastSlicerOptions" })}>
                Fast Slicer with direct compilation via ZX
            </option>
            <option
                onClick={() => setCompilationOptions({ ...compilationOptions, kind: "LitinskiCompilationOptions" })}>
                Litinski style compilation via Pauli Rotations
            </option>
        </Select>
        {(compilationOptions.kind === "FastSlicerOptions")
            ?
            <>
                <p>
                    <b>Note:</b> If submitting .qasm, the fast slicer only supports
                    {' '}
                    <Link
                        color="teal.500"
                        href="https://github.com/latticesurgery-com/liblsqecc#qasm-support-highly-experimental/"
                        target="_blank"
                        isExternal
                    >
                        a very small subset
                    </Link>.
                </p>
                <HStack>
                    <Select>
                        {Object.keys(LayoutType).filter((v) => isNaN(Number(v))).map((item) =>
                            <option
                                selected={LayoutType[compilationOptions.fastSlicerOptions.layoutType] === item}
                                onClick={() => updateFastSlicerOptions({
                                    ...compilationOptions.fastSlicerOptions, layoutType : LayoutType[item as keyof typeof LayoutType]
                                })}>
                                {item}
                            </option>
                        )
                        }
                    </Select>
                    <Select>
                        {Object.keys(CorrectiveTermBehaviour).filter((v) => isNaN(Number(v))).map((item) =>
                            <option
                                selected={CorrectiveTermBehaviour[compilationOptions.fastSlicerOptions.correctiveTermBehaviour] === item}
                                onClick={() => updateFastSlicerOptions({
                                    ...compilationOptions.fastSlicerOptions, correctiveTermBehaviour : CorrectiveTermBehaviour[item as keyof typeof CorrectiveTermBehaviour]
                                })}>
                                {item}
                            </option>
                        )
                        }
                    </Select>
                </HStack>
            </>
            :
            <Checkbox
                isChecked={compilationOptions.litinskiCompilationOptions.doStabilizerCommutingTransform}
                onChange={(e) => updateLitinskiCompilationOptions({
                            ...compilationOptions.litinskiCompilationOptions,
                            doStabilizerCommutingTransform: e.target.checked
                        })}
            >
                <Text as={"span"}>Pi/4 removing transform</Text>
            </Checkbox>
        }
    </VStack>
}



const runCompilation = async (setAppState:React.Dispatch<AppState>, data : string, compilationOptions:CompilationOptions, repeats: number) => {

    if (compilationOptions.kind == "LitinskiCompilationOptions")
        submitCompileRequest(setAppState, data, compilationOptions.litinskiCompilationOptions, repeats)
    else {

    }
}

type CircuitSelectProps = {
    appState: AppState
    setAppState: React.Dispatch<AppState>
    repeats: number
    setRepeats: (value: number) => void
}

const CircuitSelect = ({ appState, setAppState, repeats, setRepeats }: CircuitSelectProps) => {
    const [compilationOptions, setCompilationOptions] = useState<CompilationOptions>(defaultCompilationOptions)
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
        if (file.name.slice(-5) == ".json") {
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
            await runCompilation(setAppState, data as string, compilationOptions, repeats)
        }
    }

    const onExampleCircuitSelect = async (example: string) => {
        const file_url = `${process.env.PUBLIC_URL}/assets/demo_circuits/${example}`
        const data = await fetch(file_url).then((response) => response.text())
        if (data) {
            await runCompilation(setAppState, data as string, compilationOptions, repeats)
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
            <CompilationOptionsSelector compilationOptions={compilationOptions} setCompilationOptions={setCompilationOptions} />
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
