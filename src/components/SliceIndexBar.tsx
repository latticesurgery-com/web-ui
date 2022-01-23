import { Box, Flex,Center,Text } from "@chakra-ui/react"

type SliceIndexBarProps = {
    count: number
    selected: number
}
const SliceIndexBar = ({ count, selected }: SliceIndexBarProps): JSX.Element => {
    const nElements = Array.from(Array(count).keys())
    // const [selectedIndex, setSelectedIndex] = React.useState(0)
    return (
        <>
            <Box border={"6px"} borderColor="black">
                <Flex flexWrap={"wrap"} gap={1}>
                    {nElements.map(function (element, index) {
                        const color = index == selected ? "#292cff" : "lightgrey"
                        return (
                            <Box
                                h="35px"
                                w="35px"
                                rounded="lg"
                                key={index}
                                border="5px"
                                backgroundColor={color}
                                textColor="white"
                            ><Center><Text>{index==selected? index:null}</Text></Center></Box>
                        )
                    })}
                </Flex>
            </Box>
        </>
    )
}

export default SliceIndexBar
