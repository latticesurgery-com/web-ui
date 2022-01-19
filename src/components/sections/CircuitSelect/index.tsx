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
} from "@chakra-ui/react"
import { IoChevronDownSharp } from "react-icons/io5"
import { AppStateProps } from "../../../appState"
import FileUploader from "./FileUploader"
import submitCompileRequest from "../../submitCompileRequest"

const CircuitSelect = ({ appState, setAppState }: AppStateProps) => {
    const [doTransform, setDoTransform] = useState(true)

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
        if (data) {
            submitCompileRequest({ appState, setAppState }, data as string, doTransform)
        }
    }

    const onExampleCircuitSelect = async (example: string) => {
        const file_url = `${process.env.PUBLIC_URL}/assets/demo_circuits/${example}`
        const data = await fetch(file_url).then((response) => response.text())
        if (data) {
            submitCompileRequest({ appState, setAppState }, data as string, doTransform)
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
            <Checkbox isChecked={doTransform} onChange={(e) => setDoTransform(e.target.checked)}>
                <Text as={"span"}>Litinski Transform</Text>
            </Checkbox>
        </Flex>
    )
}

export default CircuitSelect
