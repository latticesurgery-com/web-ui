const SurfaceCodesText = () => (
    <>
        <h1 id="surface-codes" className="scroll-offset">
            {" "}
            Surface Codes and Lattice Surgery{" "}
        </h1>
        <hr />
        <p>
            A proposed solution to mitigate the occurrence of errors in quantum computers are the
            so-called quantum error correcting codes (QECC). Specifically we focus on the protocol
            of lattice surgery, which is based on the prominent methodology of surface codes. A
            natural question relates to how these techniques can be employed to systematically
            obtain fault tolerant logical qubits from less reliable ones. Recent work has focused on
            building compilers that translate a logical quantum circuit to a much larger error
            corrected one, with the output circuit performing the computation specified by the
            logical circuit with QECCs <a href="https://arxiv.org/abs/1906.07994">[2]</a>
            <a href="https://arxiv.org/abs/1911.05759">[3]</a>.
        </p>
        <p>
            Surface codes are a family of QECCs that aims at improving computation fidelity by
            entangling many quantum mechanical entities in a two dimensional lattice. Our technique
            of choice for operating on this lattice is a protocol known as lattice surgery, which
            stores logical qubits in portions of the surface code&apos;s lattice patches and
            performs logical operations by merging and splitting patches{" "}
            <a href="https://iopscience.iop.org/article/10.1088/1367-2630/14/12/123011/meta">[4]</a>
            .
        </p>
        <p className="last-paragraph">
            This program handles a portion of the logical to physical compilation. It takes a
            quantum circuit and translates it to a representation of lattice surgery operations,
            which are in direct correspondence with the physical error corrected circuit, up to code
            distance. The project comes with a visualizer tool (in figure), that shows the state of
            the surface code lattice state in between surgery operations.
        </p>
    </>
)

export default SurfaceCodesText
