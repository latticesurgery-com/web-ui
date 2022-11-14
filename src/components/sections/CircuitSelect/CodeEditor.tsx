import SimpleCodeEditor from "react-simple-code-editor"
import { Box } from "@chakra-ui/react"



interface CodeEditorProps {
    code : string
    onCodeChange: (value: string) => void
}

const CodeEditor = ({code, onCodeChange}: CodeEditorProps) =>
    <Box borderWidth='1px' borderRadius='lg' minWidth={"lg"} minHeight={"md"}>
        <SimpleCodeEditor
            value={code}
            onValueChange={onCodeChange}
            highlight={(content) => content}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                border: "black"
            }}
        />
    </Box>



export default CodeEditor