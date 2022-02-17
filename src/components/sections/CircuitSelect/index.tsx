import { useState } from "react"
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
    NumberInput,
} from "@chakra-ui/react"
import { IoChevronDownSharp } from "react-icons/io5"
import { AppStateProps } from "../../../appState"
import FileUploader from "./FileUploader"
import submitCompileRequest from "../../submitCompileRequest"
import { CompilationResultSuccess } from "../../../apiResponses"
import { DevModeContext } from "../../../contexts/DevModeContext"
import React from "react"

const CircuitSelect = ({ appState, setAppState }: AppStateProps) => {
    const [doTransform, setDoTransform] = useState(true)
    const [repeats, setRepeats] = useState(0)

    const { isDevMode, setIsDevMode } = React.useContext(DevModeContext)

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
        console.log("DATA", data)
        if (file.name.slice(-5) == ".json") {
            const json_data = JSON.parse(data as string)
            setAppState({
                apiResponse: new CompilationResultSuccess(json_data, ""),
                compilationIsLoading: false,
            })
        } else {
            submitCompileRequest({ appState, setAppState }, data as string, doTransform, repeats)
        }
    }

    const onExampleCircuitSelect = async (example: string) => {
        const file_url = `${process.env.PUBLIC_URL}/assets/demo_circuits/${example}`
        const data = await fetch(file_url).then((response) => response.text())
        if (data) {
            submitCompileRequest({ appState, setAppState }, data as string, doTransform, repeats)
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

            <Checkbox
                isChecked={doTransform}
                onChange={(e) => setDoTransform(e.target.checked)}
                isDisabled={appState.compilationIsLoading}
            >
                <Text as={"span"}>Litinski Transform</Text>
            </Checkbox>
            {isDevMode && (
                <Box p="3" rounded="lg" borderWidth="3px" borderColor="#98ff98">
                    <Flex gap="2">
                        <Text margin="auto">Repeats</Text>
                        <NumberInput
                            w="120px"
                            defaultValue={repeats}
                            onChange={(value) => {
                                setRepeats(parseInt(value))
                            }}
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
