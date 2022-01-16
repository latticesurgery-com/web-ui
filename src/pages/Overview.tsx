import { Container, Heading, Text, Box, Link } from "@chakra-ui/react"
import Navbar from "../components/UI/Navbar"

const Overview = (): JSX.Element => {
    return (
        <Container maxW="container.xl">
            <Navbar />
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
                    with quantum states. The states are tracked and &ldquo;evolved&rdquo;, so that
                    one can view what the lattice surgery operations are doing to the quantum
                    states. When compilation terminates, the user is presented with a viewer (in
                    figure) to explore this computation. Additionally one can choose to display the
                    intermediate stages, expressed as quantum circuits.
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
                    Surface codes
                    <Link
                        as="sub"
                        color="teal.500"
                        href="https://arxiv.org/abs/1911.05759"
                        isExternal
                    >
                        [1]
                    </Link>{" "}
                    of which we follow the formulation of a lattice surgery computation in terms of
                    patches and the pre processing of quantum circuits as Pauli rotations.
                    Additionally we have an option to remove the stabilizer part of the circuit from
                    the quantum computation with an algorithm outlined in the same paper. It is
                    available with the name Litinski Transform.
                </Text>
                <Heading as="h2" size="lg" mb={8} textAlign={"center"}>
                    Surface Codes and Lattice Surgery
                </Heading>
                <Text mb={4}>
                    A proposed solution to mitigate the occurrence of errors in quantum computers
                    are the so-called quantum error correcting codes (QECC). Specifically we focus
                    on the protocol of lattice surgery, which is based on the prominent methodology
                    of surface codes. A natural question relates to how these techniques can be
                    employed to systematically obtain fault tolerant logical qubits from less
                    reliable ones. Recent work has focused on building compilers that translate a
                    logical quantum circuit to a much larger error corrected one, with the output
                    circuit performing the computation specified by the logical circuit with QECCs
                    <Link
                        color="teal.500"
                        as="sub"
                        href="https://arxiv.org/abs/1906.07994"
                        isExternal
                    >
                        [2]
                    </Link>
                    <Link
                        color="teal.500"
                        as="sub"
                        href="https://arxiv.org/abs/1911.05759"
                        isExternal
                    >
                        [3]
                    </Link>
                    .
                </Text>
                <Text mb={4}>
                    Surface codes are a family of QECCs that aims at improving computation fidelity
                    by entangling many quantum mechanical entities in a two dimensional lattice. Our
                    technique of choice for operating on this lattice is a protocol known as lattice
                    surgery, which stores logical qubits in portions of the surface code&apos;s
                    lattice patches and performs logical operations by merging and splitting patches
                    <Link
                        as="sub"
                        color="teal.500"
                        href="https://iopscience.iop.org/article/10.1088/1367-2630/14/12/123011/meta"
                        isExternal
                    >
                        [4]
                    </Link>
                    .
                </Text>
                <Text mb={8}>
                    This program handles a portion of the logical to physical compilation. It takes
                    a quantum circuit and translates it to a representation of lattice surgery
                    operations, which are in direct correspondence with the physical error corrected
                    circuit, up to code distance. The project comes with a visualizer tool (in
                    figure), that shows the state of the surface code lattice state in between
                    surgery operations.
                </Text>
            </Box>
        </Container>
    )
}

export default Overview
