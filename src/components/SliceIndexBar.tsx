import { Box, Flex, Center, Text } from "@chakra-ui/react"

type SliceIndexBarProps = {
    count: number
    selected: number
    setSlice: (num: number) => void
}
const SliceIndexBar = ({ count, selected, setSlice }: SliceIndexBarProps): JSX.Element => {
    const nElements = Array.from(Array(count).keys())
    const flex_gap = 0
    // const [selectedSlice, setSelectedSlice] = React.useState<number>(initial)
    const handleChange = (ind: number) => {
        setSlice(ind)
    }
    return (
        <Box borderWidth="3px" borderColor="black" maxW="400px" rounded="xl" p="1" boxShadow={"lg"}>
            <Flex gap={flex_gap}>
                {nElements.map(function (element, index) {
                    const color = index <= selected ? "#4299e1" : "lightgrey"
                    return (
                        <Box
                            h="40px"
                            width={200 / count - count * flex_gap}
                            key={index}
                            borderWidth="0.75px"
                            borderColor="white"
                            backgroundColor={color}
                            textColor="white"
                            onClick={() => handleChange(index)}
                            rounded="sm"
                        ></Box>
                    )
                })}
                <Box width="50px">
                    <Center>
                        <Text>{selected + 1}</Text>
                    </Center>
                </Box>
            </Flex>
        </Box>
    )
}

export default SliceIndexBar
