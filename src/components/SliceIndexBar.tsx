import {
    VStack,
    Box,
    Heading,
    Center,
    Switch,
    FormLabel,
    Flex,
    Text,
    Button,
} from "@chakra-ui/react"
import React from "react"

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
                        var color = index == selected ? "#292cff" : "lightgrey"
                        return (
                            <Box
                                h="30px"
                                w="30px"
                                rounded="lg"
                                key={index}
                                border="5px"
                                backgroundColor={color}
                            ></Box>
                        )
                    })}
                </Flex>
            </Box>
        </>
    )
}

export default SliceIndexBar
