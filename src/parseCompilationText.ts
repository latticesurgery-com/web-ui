const t = `Input Circuit:
    ┌───┐     ┌─┐   
    q_0: ┤ H ├──■──┤M├───
    └───┘┌─┴─┐└╥┘┌─┐
    q_1: ─────┤ X ├─╫─┤M├
        └───┘ ║ └╥┘
    c: 2/═══════════╩══╩═
              0  1 
    Circuit as Pauli rotations:
    q0--|X|--|Z|--|X|--|Z|--|Z|--|I|--|Z|--|I|
    q1--|I|--|I|--|I|--|X|--|I|--|X|--|I|--|Z|
    pi*  1/4  1/4  1/4  1/4 -1/4 -1/4   M    M 

    Circuit after the Litinski Transform:
    q0--|X|--|X|
    q1--|I|--|Z|
    pi*  -M   -M
`

function parseCompilationText(compilation_text) {
    // Manually parse Compilation text into each part
    const compilation_text_split = compilation_text.split("Circuit")
    var input_circuit = compilation_text_split[1].slice(2)

    console.log(input_circuit)

    var pauli_rotations_split = compilation_text_split[2].split(":")
    console.log(pauli_rotations_split[1].slice(1))

    const circuit_after_litinski_split = compilation_text_split[3].split(":")
    console.log(circuit_after_litinski_split[1])

    return {
        input_circuit: input_circuit,
        circuit_after_pauli_rotations: pauli_rotations_split[1],
        circuit_after_litinski: circuit_after_litinski_split[1].slice(1),
    }
}

const p = parseCompilationText(t)
console.log(p)
