import {
    CompilationOptions,
    CorrectiveTermBehaviour,
    FastSlicerOptions,
    LayoutType,
    LitinskiCompilationOptions,
} from "../../../lib/compilationOptions"
import React from "react"
import { Checkbox, HStack, Link, Select, Text, VStack } from "@chakra-ui/react"

interface CompilationOptionsSelectorProps {
    compilationOptions: CompilationOptions
    setCompilationOptions: React.Dispatch<CompilationOptions>
}

const CompilationOptionsSelector = ({
    compilationOptions,
    setCompilationOptions,
}: CompilationOptionsSelectorProps) => {
    const updateFastSlicerOptions = (fastSlicerOptions: FastSlicerOptions) =>
        setCompilationOptions({ ...compilationOptions, fastSlicerOptions })
    const updateLitinskiCompilationOptions = (
        litinskiCompilationOptions: LitinskiCompilationOptions
    ) => setCompilationOptions({ ...compilationOptions, litinskiCompilationOptions })

    return (
        <VStack>
            <Select>
                <option
                    onClick={() =>
                        setCompilationOptions({ ...compilationOptions, kind: "FastSlicerOptions" })
                    }
                >
                    Fast Slicer with direct compilation via ZX
                </option>
                <option
                    onClick={() =>
                        setCompilationOptions({
                            ...compilationOptions,
                            kind: "LitinskiCompilationOptions",
                        })
                    }
                >
                    Litinski style compilation via Pauli Rotations
                </option>
            </Select>
            {compilationOptions.kind === "FastSlicerOptions" ? (
                <>
                    <Text>
                        <b>Note:</b> If submitting .qasm, the fast slicer only supports{" "}
                        <Link
                            color="teal.500"
                            href="https://github.com/latticesurgery-com/liblsqecc#qasm-support-highly-experimental/"
                            target="_blank"
                            isExternal
                        >
                            a very small subset
                        </Link>
                        .
                    </Text>
                    <HStack>
                        <Text>Layout:</Text>
                        <Select
                            defaultValue={
                                LayoutType[compilationOptions.fastSlicerOptions.layoutType]
                            }
                        >
                            {Object.keys(LayoutType)
                                .filter((v) => isNaN(Number(v)))
                                .map((item) => (
                                    <option
                                        key={item}
                                        onClick={() =>
                                            updateFastSlicerOptions({
                                                ...compilationOptions.fastSlicerOptions,
                                                layoutType:
                                                    LayoutType[item as keyof typeof LayoutType],
                                            })
                                        }
                                    >
                                        {item}
                                    </option>
                                ))}
                        </Select>
                        <Text>Apply corrective terms:</Text>
                        <Select
                            defaultValue={
                                CorrectiveTermBehaviour[
                                    compilationOptions.fastSlicerOptions.correctiveTermBehaviour
                                ]
                            }
                        >
                            {Object.keys(CorrectiveTermBehaviour)
                                .filter((v) => isNaN(Number(v)))
                                .map((item) => (
                                    <option
                                        key={item}
                                        onClick={() =>
                                            updateFastSlicerOptions({
                                                ...compilationOptions.fastSlicerOptions,
                                                correctiveTermBehaviour:
                                                    CorrectiveTermBehaviour[
                                                        item as keyof typeof CorrectiveTermBehaviour
                                                    ],
                                            })
                                        }
                                    >
                                        {item}
                                    </option>
                                ))}
                        </Select>
                    </HStack>
                </>
            ) : (
                <Checkbox
                    isChecked={
                        compilationOptions.litinskiCompilationOptions.doStabilizerCommutingTransform
                    }
                    onChange={(e) =>
                        updateLitinskiCompilationOptions({
                            ...compilationOptions.litinskiCompilationOptions,
                            doStabilizerCommutingTransform: e.target.checked,
                        })
                    }
                >
                    <Text as={"span"}>Pi/4 removing transform</Text>
                </Checkbox>
            )}
        </VStack>
    )
}

export default CompilationOptionsSelector
