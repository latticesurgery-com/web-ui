import { Box, Flex, Center, NumberInput, NumberInputField } from "@chakra-ui/react"
import { StringOrNumber } from "@chakra-ui/utils"
import { useEffect, useState } from "react"

type SliceIndexBarProps = {
    count: number
    selected: number
    setSlice: (num: number) => void
}
const SliceIndexBar = ({ count, selected, setSlice }: SliceIndexBarProps): JSX.Element => {
    const [numInput, setNumInput] = useState<StringOrNumber>(selected)
    const handleSliceClick = (ind: number) => {
        setSlice(ind)
        setNumInput(ind)
    }
    const max_steps = count <= 100 ? count : 100 // customizable
    const nSteps = Array.from(Array(max_steps).keys())

    const handleInputChange = (input: string) => {
        setNumInput(input)
        try {
            const val = parseInt(input)
            if (val > 0 && val < count) {
                setSlice(val)
            }
        } catch {
            // if the string input is not a number within the valid slice range, we do nothing.
        }
    }

    // Triggers component re-render when selected is updated
    useEffect(() => {
        setNumInput(selected)
    }, [selected])
    return (
        <Box borderWidth="3px" borderColor="black" maxW="450px" rounded="lg" p="1" boxShadow="md">
            <Flex>
                {nSteps.map((index) => {
                    const color = (index * count) / max_steps <= selected ? "#4299e1" : "lightgrey"
                    return (
                        <Box
                            h="40px"
                            w={`${400 / max_steps}px`}
                            key={index}
                            backgroundColor={color}
                            textColor="white"
                            onClick={() => {
                                handleSliceClick(Math.floor((index * count) / max_steps))
                            }}
                        ></Box>
                    )
                })}
                <Box>
                    <Center>
                        <Flex>
                            <NumberInput
                                w="100px"
                                variant="outline"
                                defaultValue={selected + 1}
                                value={numInput}
                                max={count}
                                onChange={(e) => {
                                    handleInputChange(e)
                                }}
                            >
                                <NumberInputField />
                            </NumberInput>
                        </Flex>
                    </Center>
                </Box>
            </Flex>
        </Box>
    )
}

export default SliceIndexBar
