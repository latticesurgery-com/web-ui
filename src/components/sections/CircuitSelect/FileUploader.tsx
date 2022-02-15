import { Center, Spinner, Text, useColorModeValue, Icon } from "@chakra-ui/react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { AiFillFileAdd } from "react-icons/ai"

interface FileUploaderProps {
    onFileAccepted: (file: File) => void
    isLoading: boolean
}

const FileUploader = ({ onFileAccepted, isLoading }: FileUploaderProps): JSX.Element => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onFileAccepted(acceptedFiles[0])
            }
        },
        [onFileAccepted]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: [".qasm",".txt"],
        maxFiles: 1,
        multiple: false,
        disabled: isLoading,
    })

    const activeBg = useColorModeValue("gray.100", "gray.600")
    const borderColor = useColorModeValue(
        isDragActive ? "teal.300" : "gray.300",
        isDragActive ? "teal.500" : "gray.500"
    )

    return (
        <Center
            p={10}
            cursor={!isLoading ? "pointer" : "not-allowed"}
            transition={"background-color 0.2s ease"}
            borderRadius={4}
            bg={isDragActive ? activeBg : "transparent"}
            _hover={{ bg: !isLoading ? activeBg : "transparent" }}
            border={"3px dashed"}
            borderColor={borderColor}
            h={"180px"}
            w={{ base: "100%", sm: "80%", md: "65%" }}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <Icon boxSize="28px" as={AiFillFileAdd} mr={2} />
            <Text>
                {isDragActive
                    ? "Drop the file here"
                    : "Drop your .qasm circuit here, or click to select file."}
                <br />
                Alternatively, upload Json compilation result as .txt
            </Text>
            {isLoading && <Spinner ml={2} size="sm" />}
        </Center>
    )
}

export default FileUploader
