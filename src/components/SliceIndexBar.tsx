import { Box, Flex, NumberInput, NumberInputField } from "@chakra-ui/react"
import { StringOrNumber } from "@chakra-ui/utils"
import { useEffect, useState } from "react"

type SliceIndexBarProps = {
    count: number
    selected: number
    setSlice: (num: number) => void
}
const SliceIndexBar = ({ count, selected, setSlice }: SliceIndexBarProps): JSX.Element => {
    // set input field state seperately from selected slice state and only update slice state when input field is valid
    const [numInput, setNumInput] = useState<StringOrNumber>(selected)
    // handleSliceClick is run when you click the slice selector range
    const handleSliceClick = (ind: number) => {
        setSlice(ind)
        setNumInput(ind)
    }
    // group slices
    const max_steps = count <= 100 ? count : 100 // customizable
    const nSteps = Array.from(Array(max_steps).keys())

    // run handleInputChange when input field is updated
    const handleInputChange = (input: string) => {
        setNumInput(input)
        try {
            const val = parseInt(input)
            if (0 <= val && val < count) {
                setSlice(val)
            }
        } catch {
            // if the string input is not a number within the valid slice range, do nothing.
        }
    }
    // Triggers component re-render when selected is updated
    useEffect(() => {
        setNumInput(selected)
    }, [selected])

    const numDigits = (num: number) => {
        return Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1
    }

    return (
        <Box borderWidth="3px" borderColor="black" maxW="500px" rounded="lg" p="1" boxShadow="md">
            <Flex>
                {nSteps.map((index) => {
                    const color = (index * count) / max_steps <= selected ? "blue.300" : "lightgrey"
                    return (
                        <Box
                            h="40px"
                            w={`${400 / max_steps}px`}
                            key={index}
                            backgroundColor={color}
                            border={count < 55 ? "1px solid white" : ""}
                            textColor="white"
                            onClick={() => {
                                handleSliceClick(Math.floor((index * count) / max_steps))
                            }}
                        ></Box>
                    )
                })}
                <Box>
                    <NumberInput
                        defaultValue={selected + 1}
                        value={numInput}
                        max={count}
                        onChange={(e) => {
                            handleInputChange(e)
                        }}
                    >
                        <NumberInputField w={`${15 + 15 * numDigits(count - 1)}px`} p="1" />
                    </NumberInput>
                </Box>
            </Flex>
        </Box>
    )
}

export default SliceIndexBar
