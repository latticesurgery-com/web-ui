/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react"
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
    Grid,
    GridItem,
} from "@chakra-ui/react"
import parseCompilationText from "../../lib/parseCompilationText"
import SliceIndexBar from "../SliceIndexBar"
import { IoSaveOutline } from "react-icons/io5"
import { MdCenterFocusStrong } from "react-icons/md"
import ZoomBar from "../Zoombar"
import Draggable from "react-draggable"

import type { CompilationResult, Slice } from "../../lib/slices"

type SliceViewerProps = {
    slice: Slice
    cellDimensionPixels: number
}
const SliceViewer = ({ slice, cellDimensionPixels }: SliceViewerProps) => {
    const m_rows = slice.length
    const n_cols = slice[0].length

    return (
        <Grid
            templateRows={`repeat(${m_rows}, ${cellDimensionPixels}px)`}
            gap="0"
            w="fit-content"
            shadow="2xl"
            mx="8"
        >
            {slice.map((row, row_idx) => (
                <Grid
                    className="lattice-row"
                    key={row_idx}
                    templateColumns={`repeat(${n_cols}, ${cellDimensionPixels}px)`}
                    gap="0"
                >
                    {row.map((cell, col_idx) => (
                        <GridItem
                            w="100%"
                            h={`${cellDimensionPixels}px`}
                            className="lattice-cell"
                            key={col_idx}
                            shadow="md"
                        >
                            <CellViewer
                                cell={cell}
                                cell_font_size={cellDimensionPixels / 6.5}
                                row_idx={row_idx}
                                col_idx={col_idx}
                                key={col_idx}
                            />
                        </GridItem>
                    ))}
                </Grid>
            ))}
        </Grid>
    )
}

interface LatticeViewProps {
    compilationResult: CompilationResult
}

const LatticeView = ({ compilationResult }: LatticeViewProps): JSX.Element => {
    const [selectedSliceNumber, setSelectedSliceNumber] = useState<number>(0)
    const changeSlice = (delta: number) => {
        setSelectedSliceNumber(selectedSliceNumber + delta)
    }
    const [cellDimensionPixels, setCellDimensionPixels] = useState(130)
    // cell font size is cellDimensionPixels divided by 20.
    const { compilation_text, slices } = compilationResult
    const num_slices = slices.length

    const [latticePosition, setLatticePosition] = useState({ x: 0, y: 0 })
    const defaultLatticePosition = { x: 0, y: 0 }

    const nodeRef = useRef(null) // Add to <Draggable> element

    const stages = parseCompilationText(compilation_text)
    // JS object that returns boolean when "previous" or "next" buttons need to be disabled
    const disable = {
        prev: selectedSliceNumber === 0,
        next: selectedSliceNumber === num_slices - 1,
    }

    // set state of checkbox switch
    const [showCompilationText, setCompilationText] = useState(false)

    // export slices to downloadable text JSON file
    const exportJson = (compilationResult: CompilationResult) => {
        const stringJson = JSON.stringify(compilationResult)
        const blob = new Blob([stringJson], { type: "text/plain;charset=utf-8" })
        const url = window.URL || window.webkitURL
        const link = url.createObjectURL(blob)
        const a = document.createElement("a")
        // Attach date suffix, plus random id for now. Can include circuit, params eventually
        const rand_n = (Math.random() + 1).toString(36).substring(8)
        const date = new Date().toISOString().split("T")[0]
        a.download = "LSC_" + date + "_" + rand_n + ".json"
        a.href = link
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    const m_rows = slices[selectedSliceNumber].length

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

            <Flex gap="6" justifyContent={"center"} py={4} flexWrap={"wrap"}>
                <Flex alignItems="center">
                    <FormLabel htmlFor="compilation-text" fontSize="xl" mb="0">
                        View Compilation
                    </FormLabel>
                    <Switch
                        id="compilation-text"
                        size="lg"
                        onChange={(e) => {
                            setCompilationText(e.target.checked)
                        }}
                        checked={showCompilationText}
                    />
                </Flex>
                <Button borderWidth="2px" onClick={() => exportJson(compilationResult)}>
                    <Flex gap="4">
                        <Text fontSize="xl" margin="auto">
                            Save JSON
                        </Text>
                        <IoSaveOutline size="30px"></IoSaveOutline>
                    </Flex>
                </Button>
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

            <Box pt="3" pb="3">
                <Center>
                    <Flex flexWrap="wrap">
                        <Heading as="h3" size="xl">
                            Select Time Slice
                        </Heading>
                        <Text ml="4" mt="1" fontSize="24px">
                            N = {num_slices}
                        </Text>
                    </Flex>
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
                                count={num_slices}
                                selected={selectedSliceNumber}
                                setSlice={setSelectedSliceNumber}
                            />
                        </Box>
                    </Flex>
                </Center>
            </Box>

            <Box className="full-width">
                <Flex>
                    <Box w="40px" h="350px" mt="2" rounded="3xl">
                        <VStack>
                            <Button onClick={() => setLatticePosition(defaultLatticePosition)}>
                                <MdCenterFocusStrong size="25px" />
                            </Button>
                            <ZoomBar
                                cellDimension={cellDimensionPixels}
                                setCellDimension={setCellDimensionPixels}
                            />
                        </VStack>
                    </Box>
                    <Box
                        h={m_rows * cellDimensionPixels * 1.05}
                        minH="600px"
                        maxH="4000px"
                        overflow="hidden"
                    >
                        <Draggable
                            nodeRef={nodeRef}
                            position={latticePosition}
                            onStop={(e, data) => setLatticePosition({ x: data.x, y: data.y })}
                        >
                            <Box ref={nodeRef} id="lattice-container" w="94vw">
                                <SliceViewer
                                    slice={slices[selectedSliceNumber]}
                                    cellDimensionPixels={cellDimensionPixels}
                                />
                            </Box>
                        </Draggable>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default LatticeView
