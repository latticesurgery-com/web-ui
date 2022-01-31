/** @jsxImportSource @emotion/react */
import React, { useRef } from "react"
import { useState } from "react"
import { CompilationResult, Slice } from "../../slices"
import CellViewer from "../CellViewer"
import "./LatticeView.css"
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
import parseCompilationText from "../../parseCompilationText"
import SliceIndexBar from "../SliceIndexBar"

type SliceViewerProps = {
    slice: Slice
}
const SliceViewer = ({ slice }: SliceViewerProps) => (
    <div className="slice grid">
        {slice.map((row, row_idx) => (
            <div className="lattice-row row flex-nowrap" key={row_idx}>
                {row.map((cell, col_idx) => (
                    <div className="lattice-cell ratio ratio-1x1 col" key={col_idx}>
                        <CellViewer cell={cell} row_idx={row_idx} col_idx={col_idx} key={col_idx} />
                    </div>
                ))}
            </div>
        ))}
    </div>
)

type LatticeViewProps = {
    compilationResult: CompilationResult
}
const LatticeView = ({ compilationResult }: LatticeViewProps): JSX.Element => {
    const [selectedSliceNumber, setSelectedSliceNumber] = React.useState<number>(0)
    const changeSlice = (delta: number) => {
        setSelectedSliceNumber(selectedSliceNumber + delta)
    }
    const { compilation_text, slices } = compilationResult
    const slices_len = slices.length

    const stages = parseCompilationText(compilation_text)
    // JS object that returns boolean when "previous" or "next" buttons need to be disabled
    const disable = {
        prev: selectedSliceNumber === 0,
        next: selectedSliceNumber === slices_len - 1,
    }

    // scroll into Lattice View Section, one time, after compilation is completed
    const latticeSection = useRef<HTMLInputElement>(null)
    React.useEffect(() => {
        latticeSection.current && latticeSection.current?.scrollIntoView()
    }, [])

    // set state of checkbox switch
    const [showCompilationText, setCompilationText] = useState(true)
    const handleChange = () => {
        setCompilationText(!showCompilationText)
    }
    return (
        <>
            <VStack spacing={4} align="stretch">
                <Heading as="h1" size="2xl" mt={2} mb={2} textAlign={"center"}>
                    Lattice Viewer
                </Heading>
                <Center>
                    <Box h="10px" bg="blue.200" rounded="lg" width="75%" />
                </Center>
            </VStack>

            <Flex gap={3} justifyContent={"center"} py={4} flexWrap={"wrap"}>
                <FormLabel htmlFor="compilation-text" fontSize="xl" mb="0">
                    View Compilation
                </FormLabel>
                <Switch
                    id="compilation-text"
                    size="lg"
                    onChange={handleChange}
                    defaultChecked={true}
                />
            </Flex>

            {showCompilationText && (
                <Flex gap={10} justifyContent={"center"} pt={0} pb={4} flexWrap={"wrap"}>
                    {stages.map((stage, idx) => (
                        <Box
                            className="box-hover"
                            textAlign="center"
                            borderWidth="4px"
                            borderRadius="xl"
                            boxShadow={"xl"}
                            key={idx}
                            p={4}
                        >
                            <Text className="line-1">{stage.name}</Text>
                            <Box pt={1}>
                                <pre>{stage.content}</pre>
                            </Box>
                        </Box>
                    ))}
                </Flex>
            )}

            <Box pt={3} pb={3}>
                <Center>
                    <Heading as="h3" size="xl">
                        Select Time Slice
                    </Heading>
                </Center>

                <Center pt={3}>
                    <Flex flexWrap={"wrap"}>
                        <Box>
                            <Flex mr={3}>
                                <Button
                                    fontSize="xl"
                                    disabled={disable["prev"]}
                                    onClick={() => changeSlice(-1)}
                                >
                                    Prev
                                </Button>
                                <Button
                                    fontSize="xl"
                                    disabled={disable["next"]}
                                    onClick={() => changeSlice(+1)}
                                >
                                    Next
                                </Button>
                            </Flex>
                        </Box>
                        <Box>
                            <SliceIndexBar
                                count={slices_len}
                                selected={selectedSliceNumber}
                                setSlice={setSelectedSliceNumber}
                            />
                        </Box>
                    </Flex>
                </Center>
            </Box>

            <Box>
                <div id="draggable-container" className="mt-2 mb-5">
                    <SliceViewer slice={slices[selectedSliceNumber]} />
                </div>
            </Box>
        </>
    )
}

export default LatticeView
