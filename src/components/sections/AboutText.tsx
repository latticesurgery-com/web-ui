const AboutText = () => (
    <>
        <h2 id="about" className="scroll-offset mt-4">
            About
        </h2>
        <hr />
        <p>
            This compiler accepts a quantum circuit and compiles it to a computation expressed in
            terms of lattice surgery operations on a surface code lattice.
        </p>
        <p>
            The output of the compiler is a computation is expressed in terms of <em>patches</em> of
            a surface code lattice. Each patch is associated with quantum states. The states are
            tracked and &ldquo;evolved&rdquo;, so that one can view what the lattice surgery
            operations are doing to the quantum states. When compilation terminates, the user is
            presented with a viewer (in figure) to explore this computation. Additionally one can
            choose to display the intermediate stages, expressed as quantum circuits.
        </p>
        <p>
            This tool is the result of a project aimed at exploring the challenges involved with
            compiling fault tolerant quantum circuits. It is intended primarily as a framework onto
            which develop ideas for compiling real world circuits. One day we hope to see te
            compiler be able to translate a quantum circuit all the way to a physical circuit that
            can run on a real device.
        </p>
        <p>
            A great deal of inspiration was taken from Daniel Litinski&apos;s Game of Surface codes{" "}
            <a href="https://arxiv.org/abs/1911.05759">[1]</a> of which we follow the formulation of
            a lattice surgery computation in terms of patches and the pre processing of quantum
            circuits as Pauli rotations. Additionally we have an option to remove the stabilizer
            part of the circuit from the quantum computation with an algorithm outlined in the same
            paper. It is available with the name Litinski Transform.
        </p>
    </>
)

export default AboutText
