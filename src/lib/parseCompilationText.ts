class CompilationStage {
    constructor(public name: string, public content: string) {}
}

const parseCompilationText = (compilation_text: string): Array<CompilationStage> => {
    // Manually parse Compilation text into each part
    if (compilation_text == "") {
        return [new CompilationStage("User Uploaded Json", "")]
    }

    if (compilation_text.includes("Emscripten Success")) {
        return [new CompilationStage("Compiled in browser:", "Success")]
    }

    if (!compilation_text.includes("Circuit"))
    {
        return [new CompilationStage(compilation_text, "")]
    }

    const compilation_text_split = compilation_text.split("Circuit")
    const input_circuit = compilation_text_split[1].slice(2)

    const pauli_rotations_split = compilation_text_split[2].split(":")

    const stages: Array<CompilationStage> = [
        new CompilationStage("Input Circuit", input_circuit),
        new CompilationStage("Pauli Rotations", pauli_rotations_split[1].slice(1, -1)),
    ]

    if (compilation_text.includes("Litinski")) {
        const circuit_after_litinski_split = compilation_text_split[3].split(":")
        const circuit_after_litinski = circuit_after_litinski_split[1].slice(1)
        stages.push(new CompilationStage("Litinski Transform", circuit_after_litinski))
    }

    if (compilation_text.includes("resource")) {
        const circuit_after_resource_split = compilation_text_split[4].split(":\n")
        const circuit_after_resource = circuit_after_resource_split[1]
        stages.push(new CompilationStage("Resource Estimation", circuit_after_resource))
    }

    return stages
}

export default parseCompilationText
