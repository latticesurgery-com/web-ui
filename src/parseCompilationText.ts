function parseCompilationText(compilation_text: string) {
    // Manually parse Compilation text into each part
    const compilation_text_split = compilation_text.split("Circuit")
    const input_circuit = compilation_text_split[1].slice(2)

    const pauli_rotations_split = compilation_text_split[2].split(":")
    var compilationTextJson = {
        input_circuit: input_circuit,
        circuit_after_pauli_rotations: pauli_rotations_split[1].slice(1, -1),
        circuit_after_litinski: ""
    } 
    console.log("PIXZZA11111:",compilationTextJson)
    if (compilation_text.includes("Litinski")) {
        const circuit_after_litinski_split = compilation_text_split[3].split(":")
        const circuit_after_litinski = circuit_after_litinski_split[1].slice(1)
        compilationTextJson.circuit_after_litinski = circuit_after_litinski
    }
    return compilationTextJson
}

export default parseCompilationText