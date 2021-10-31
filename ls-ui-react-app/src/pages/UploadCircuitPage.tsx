import React from "react";
import {css} from "@emotion/react";
import {AppState, AppStateProps} from "../appState";

const UploadACircuit = ( {setAppState} : AppStateProps ) => <p>
    Upload an OpenQASM circuit.
    <form>
        <div className="input-group">
            <input id="circuit" className="form-control circuit" name="circuit" type="file"/>
            <div className="input-group-append">
                <input type="submit" className="btn btn-primary" value="Go!"/>
            </div>
        </div>
        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="litinski_check1" name='litinski'
                   value='true' checked/>
            <label className="form-check-label" htmlFor="litinski_check1">Litinski
                Transform</label>
        </div>
    </form>
</p>

const SelectSampleCircuit = ({setAppState} : AppStateProps) => <p>
    Or choose from the following example circuits:
    <form>
        <div className="input-group">
            <select className="form-select" name="circuit" css={css`max-width:250px`}>
                <option value='' disabled selected> Select a Circuit</option>
                <option value="{{ circuit }}">circuit</option>
            </select>
            <div className="input-group-append">
                <input type="submit" className="btn btn-info" value="Go!"/>
            </div>
            <input type="hidden" name="localcircuit" value="yes"/>
        </div>

        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="litinski_check1" name='litinski'
                   value='true' checked/>
            <label className="form-check-label" htmlFor="litinski_check1">Litinski
                Transform</label>
        </div>
    </form>
</p>

const CompilerInputCircuitSelection = ({appState, setAppState} : AppStateProps) => <>
    <h2 id="get-started" className='anchor-mob'>Get Started - Upload a circuit</h2>
    <hr/>
    <UploadACircuit setAppState={setAppState} appState={appState}/>
    <SelectSampleCircuit setAppState={setAppState} appState={appState}/>
</>;


const AboutText = () => <>
    <h2 id="about" className='anchor-mob'>About</h2>
    <p>
        This compiler accepts a quantum circuit and compiles it to a computation expressed in terms
        of lattice surgery operations on a surface code lattice.
    </p>
    <img src="lattice_view_example.png" css={css`width: 100%`}
         alt="Lattice Viewer"/>
    <p>
        The output of the compiler is a computation is expressed in terms of <em>patches</em> of
        a surface code lattice. Each patch is associated with quantum states. The states are
        tracked and "evolved", so that one can view what the lattice surgery operations are
        doing to the quantum states. When compilation terminates, the user is presented with a
        viewer (in figure) to explore this computation. Additionally one can choose to display
        the intermediate stages, expressed as quantum circuits.
    </p>
    <p>
        This tool is the result of a project aimed at exploring the challenges involved with
        compiling fault tolerant quantum circuits. It is intended primarily as a framework onto
        which develop ideas for compiling real world circuits. One day we hope to see te
        compiler be able to translate a quantum circuit all the way to a physical circuit that
        can run on a real device.
    </p>
    <p>
        A great deal of inspiration was taken from Daniel Litinski's Game of Surface codes <a
        href="https://arxiv.org/abs/1911.05759">[1]</a> of which we follow the formulation of a
        lattice surgery computation in terms of patches and the pre processing of quantum
        circuits as Pauli rotations. Additionally we have an option to remove the stabilizer
        part of the circuit from the quantum computation with an algorithm outlined in the same
        paper. It is available with the name Litinski Transform.
    </p>
</>

const SurfaceCodesText = () => <>
    <h1 id="surface-codes" className='anchor-mob'> Surface Codes and Lattice Surgery </h1>
    <hr/>
    <p>
        A proposed solution to mitigate the occurrence of errors in quantum computers are
        the so-called quantum error correcting codes (QECC). Specifically we focus on the
        protocol of lattice surgery, which is based on the prominent methodology of surface
        codes. A natural question relates to how these techniques can be employed to
        systematically obtain fault tolerant logical qubits from less reliable ones. Recent
        work has focused on building compilers that translate a logical quantum circuit to a
        much larger error corrected one, with the output circuit performing the computation
        specified by the logical circuit with QECCs <a
        href="https://arxiv.org/abs/1906.07994">[2]</a><a
        href="https://arxiv.org/abs/1911.05759">[3]</a>.
    </p>
    <p>
        Surface codes are a family of QECCs that aims at improving computation fidelity by
        entangling many quantum mechanical entities in a two dimensional lattice. Our
        technique of choice for operating on this lattice is a protocol known as lattice
        surgery, which stores logical qubits in portions of the surface code's lattice
        patches and performs logical operations by merging and splitting patches <a
        href="https://iopscience.iop.org/article/10.1088/1367-2630/14/12/123011/meta">[4]</a>.
    </p>
    <p className="last-paragraph">
        This program handles a portion of the logical to physical compilation. It takes a
        quantum circuit and translates it to a representation of lattice surgery operations,
        which are in direct correspondence with the physical error corrected circuit, up to
        code distance. The project comes with a visualizer tool (figure), that shows the
        state of the surface code lattice state in between surgery operations.
    </p>
</>



const UploadCircuitPage = ( {appState, setAppState} : AppStateProps)  =>
{
    return <>
        <div className='main'>
            <section>
                <div>
                    <CompilerInputCircuitSelection appState={appState} setAppState={setAppState} />
                    <AboutText/>
                    <SurfaceCodesText/>
                    <hr/>
                </div>
            </section>
        </div>
    </>
}

export default UploadCircuitPage;
