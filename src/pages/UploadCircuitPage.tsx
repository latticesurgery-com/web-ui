/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from "@emotion/react";
import {AppStateProps} from "../appState";

import LatticeView from "../components/LatticeView";
import Loader from "../components/Loader";

import axios from "axios"
import {CompilationResult} from "../slices";
import {JsonParseError,ApiHttpError,CompilationResultSuccess,NoServerResponse,CompilerError} from "../apiResponses";
import queryString from "query-string"


const UploadACircuit = ( {appState, setAppState} : AppStateProps ) => {
    const [doLitinskiTransform, setDoLitinskiTransform] = React.useState(true)

    const [circuitStr, setCircuitStr] = React.useState<string | null>(null)

    const readCircuitFile = (file : File | undefined | null) =>
    {
        if(!file){
            setCircuitStr(null)
            return
        }

        const fileReader = new FileReader();
        fileReader.onloadend = (e) => setCircuitStr(fileReader.result as string)
        fileReader.readAsText(file)
    }

    // To Do: forbid compile request submit with empty circuit
    const submitCompileRequest = () =>
    {
        const queryStringMap = queryString.parse(window.location.search)

        const apiUrl = queryStringMap.localapi
            ? `http://localhost:${queryStringMap.port || 9876}/compile`
            : "https://api.latticesurgery.com/compile"

        // Modify State on Compile Request Submit
        setAppState({
            ...appState,
            compilationIsLoading: true,
            apiResponse: null
        })

        // Async JS HTTP request to API endpoint, apiUrl
        axios.post(apiUrl,{
            'circuit_source': 'str',
            'circuit': circuitStr,
            'apply_litinski_transform': doLitinskiTransform
        }).then( (response ) => {
            if (response.data.errorMessage) {
                const errortype = response.data.errorType;
                const msg = response.data.errorMessage;
                setAppState({
                    apiResponse: new CompilerError(errortype,msg),
                    compilationIsLoading: false
                })
            }
            else{
                try {
                    const responseJson = JSON.parse(response.data) as CompilationResult;
                    setAppState({
                        apiResponse: new CompilationResultSuccess(responseJson.slices,responseJson.compilation_text),
                        compilationIsLoading: false
                    })
                } catch (error) {
                    setAppState({
                        apiResponse: new JsonParseError((error as Error).toString()),
                        compilationIsLoading: false,
                    })
                }
            }

        // Catch Axios Errors: API errors -> timeout, error compiling, or no response
        }).catch( (error) => {

            // needs more testing. First two requests after a long lambda cooldown period result in CORS / Network Errors
            if (error.response) {
                console.error("AXIOS error:")
                console.log(error.response.data)
                console.log(error.response.headers)
                console.log(error.response.status)
                const error_code = error.response.status;
                const error_data = error.response.data;
                const error_headers = error.response.headers;
                // var api_error = new ApiHttpError(error_code,error_data,error_headers)
                setAppState({
                    // apiResponse: new ApiHttpError((error as Error).toString()),
                    apiResponse: new ApiHttpError(error_code,error_data,error_headers),
                    compilationIsLoading: false
                })
            }
            else{
                setAppState({
                    // apiResponse: new ApiHttpError((error as Error).toString()),
                    apiResponse: new NoServerResponse("Server did not respond"),
                    compilationIsLoading: false
                })
            }

        })
    }  

    return <div className="mb-3">
        Upload an OpenQASM circuit.
        <>
            <div className="input-group">
                <input
                    id="circuit"
                    className="form-control circuit"
                    name="circuit"
                    type="file"
                    onChange={(e) => readCircuitFile(e?.target?.files && e.target.files[0])}
                />
                <div className="input-group-append">
                    <button 
                        css={css`width:100px`}
                        className="btn btn-primary"
                        disabled={appState.compilationIsLoading}
                        onClick={(e) => submitCompileRequest()}
                    >
                        {
                            appState.compilationIsLoading ?
                            <Loader size={20} color="white"/> : "Go!"
                        }
                    </button>

                </div>
            </div>
            <div className="form-check">
                <input type="checkbox"
                       className="form-check-input"
                       id="litinski_check1"
                       name='litinski'
                       checked={doLitinskiTransform}
                       onChange={(event) => setDoLitinskiTransform(event.target.checked)} />
                <label className="form-check-label" htmlFor="litinski_check1">Litinski
                    Transform</label>
            </div>
        </>
    </div>
}

// TODO implement default circuits by pulling them from assets
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectSampleCircuit = ({setAppState} : AppStateProps) => <p>
    Or choose from the following example circuits:
    <form> 
        <div className="input-group">
            <select className="form-select" name="circuit" css={css`max-width:250px`}>
                <option value='' disabled selected> Select a Circuit</option>
                <option value="{{ circuit }}">circuit</option>
            </select>
            <div className="input-group-append">
                {/* <input type="submit" className="btn btn-info" value="Go!"/> */}
                {/* When implemented, will be a button with onClick rather than html input */}
                <button type="submit" className="btn btn-info">Go!</button>
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
    {/*<SelectSampleCircuit setAppState={setAppState} appState={appState}/> */}
</>;


const AboutText = () => <>
    <h2 id="about" className='anchor-mob'>About</h2>
    <hr/>
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
                    {/* Indicate loading/calculating with a spinner and text */}
                    <CompilerInputCircuitSelection appState={appState} setAppState={setAppState} />
                    { appState.compilationIsLoading && 
                        <div>
                            <div className="spinner-border text-success" role="status"></div>
                            <b>Processing...</b>
                        </div>
                    }

                    {appState.apiResponse instanceof ApiHttpError && 
                        <div className="alert alert-danger">
                            <div>{"API Status: " + appState.apiResponse.code}</div>
                            <div>
                                {appState.apiResponse.msg}
                            </div>
                        </div>
                    }

                    {appState.apiResponse instanceof CompilerError && 
                        <div className="alert alert-danger">
                            <div>{"API Status: 200"}</div>
                            <div>Compiler Error:</div>
                            <div>{appState.apiResponse.msg}</div>
                            <div>{appState.apiResponse.errortype}</div>
                        </div>
                    }

                    {appState.apiResponse instanceof JsonParseError &&
                        <div className="alert alert-danger">
                            <div>{"API Status: 200"}</div>
                            <div>{appState.apiResponse.msg}</div>
                        </div>
                    }

                    {appState.apiResponse instanceof NoServerResponse &&
                        <div className="alert alert-danger">
                            <div>{appState.apiResponse.response}</div>
                        </div>
                    }
                    
                    {/* If compilationResult changes from undefined to true (instanciated), render result in Lattice View */}
                    { appState.apiResponse instanceof CompilationResultSuccess &&
                        <LatticeView compilationResult={appState.apiResponse}/>
                    }

                    <AboutText/>
                    <SurfaceCodesText/>
                    <hr/>
                </div>
            </section>
        </div>
    </>
}

export default UploadCircuitPage;
