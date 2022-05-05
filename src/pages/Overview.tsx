import { Heading, Text, Box, Link } from "@chakra-ui/react"

const Overview = (): JSX.Element => {
    return (
        <>
            <Heading as="h1" size="2xl" mt={4} mb={10} textAlign={"center"}>
                Overview
            </Heading>
            <Box maxW={"container.lg"} mx={"auto"} mt={4}>
                <Text mb={4}>
                    This compiler accepts a quantum circuit and compiles it to a computation
                    expressed in terms of lattice surgery operations on a surface code lattice.
                </Text>
                <Text mb={8}>
                    The output of the compiler is a computation is expressed in terms of{" "}
                    <Text as="em">patches</Text> of a surface code lattice. Each patch is associated
                    with a quantum state. The states are tracked and &ldquo;evolved&rdquo;, so that
                    one can view what the lattice surgery operations are doing to the quantum
                    states. When compilation terminates, the user is presented with a viewer (in
                    figure) to explore this computation. One can choose to display the intermediate
                    stages, expressed as quantum circuits.
                </Text>
                <Text mb={4}>
                    This tool is the result of a project aimed at exploring the challenges involved
                    with compiling fault tolerant quantum circuits. It is intended primarily as a
                    framework onto which develop ideas for compiling real world circuits. One day we
                    hope to see te compiler be able to translate a quantum circuit all the way to a
                    physical circuit that can run on a real device.
                </Text>
                <Text mb={8}>
                    A great deal of inspiration was taken from Daniel Litinski&apos;s Game of
                    Surface Codes{" "}
                    <Link color="teal.500" href="https://arxiv.org/abs/1808.02892" isExternal>
                        <Text as="sup">[1]</Text>
                    </Link>
                    . We follow Litinski&apos;s formulation of lattice surgery patch computation and
                    the pre processing of quantum circuits as Pauli rotations. We have also an
                    option to remove the stabilizer part of the circuit from the quantum computation
                    with an algorithm outlined in the same paper. This algorithm is available in
                    this project as the &ldquo;Litinski Transform&rdquo;.
                </Text>
                <Heading as="h2" size="lg" mb={8} textAlign={"center"}>
                    Surface Codes and Lattice Surgery
                </Heading>
                <Text mb={4}>
                    Quantum Error correcting codes (QECC) are a proposed solution to mitigate the
                    occurrence of errors in quantum computers. Surface codes are a prominent family
                    of QECCs that operates on a square lattice. We focus on a protocol for operating
                    surface codes named of lattice surgery, which is based on
                    &ldquo;splitting&rdquo; and &ldquo;merging&rdquo; portions (the patches) of a
                    surface code lattice. A natural question is how can these techniques be employed
                    to systematically. In particular, we look at going from a logical input circuit
                    (as quantum programmer would express it) to a fault tolerant one. The goal is
                    for the output circuit to perform the same computation specified by the input
                    circuit. Recent work has focused on building compilers that translate a logical
                    quantum circuit to a much larger error corrected one, by adopting QECCs{" "}
                    <Link color="teal.500" href="https://arxiv.org/abs/1906.07994" isExternal>
                        <Text as="sup">[2]</Text>
                    </Link>
                    <Link color="teal.500" href="https://arxiv.org/abs/1911.05759" isExternal>
                        <Text as="sup">[3]</Text>
                    </Link>
                    .
                </Text>
                <Text mb={4}>
                    Surface codes are a family of QECCs that aims at improving computation fidelity
                    by entangling many quantum mechanical entities in a two dimensional lattice. Our
                    technique of choice for operating on this lattice is a protocol known as lattice
                    surgery, which stores logical qubits in portions of the surface code&apos;s
                    lattice patches and performs logical operations by merging and splitting patches{" "}
                    <Link
                        color="teal.500"
                        href="https://iopscience.iop.org/article/10.1088/1367-2630/14/12/123011/meta"
                        isExternal
                    >
                        <Text as="sup">[4]</Text>
                    </Link>
                    .
                </Text>
                <Text mb={8}>
                    This program handles a portion of the logical to physical compilation. It takes
                    a quantum circuit and translates it to a representation of lattice surgery
                    operations, which are in direct correspondence with the physical error corrected
                    circuit, up to code distance. The project comes with a visualizer tool, that
                    shows the state of the surface code lattice state in between surgery operations.
                </Text>
            </Box>
        </>
    )
}

export default Overview
