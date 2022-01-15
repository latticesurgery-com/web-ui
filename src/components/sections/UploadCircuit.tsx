/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"

import { AppStateProps } from "../../appState"
import Loader from "../../components/Loader"

import SelectExampleCircuit from "./SelectExampleCircuit"
import submitCompileRequest from "../submitCompileRequest"

const UploadACircuit = ({ appState, setAppState }: AppStateProps) => {
    const [uploadIsLoading, setUploadIsLoading] = React.useState(false)

    const [doLitinskiTransform, setDoLitinskiTransform] = React.useState(true)

    const [circuitStr, setCircuitStr] = React.useState<string | null>(null)

    const readCircuitFile = (file: File | undefined | null) => {
        if (!file) {
            setCircuitStr(null)
            return
        }

        const fileReader = new FileReader()
        fileReader.onloadend = () => setCircuitStr(fileReader.result as string)
        fileReader.readAsText(file)
    }

    // To Do: forbid compile request submit with empty circuit

    return (
        <div className="mb-3">
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
                            css={css`
                                width: 100px;
                            `}
                            className="btn btn-primary"
                            disabled={appState.compilationIsLoading}
                            onClick={() =>
                                submitCompileRequest(
                                    { appState, setAppState },
                                    circuitStr as string,
                                    setUploadIsLoading,
                                    doLitinskiTransform
                                )
                            }
                        >
                            {appState.compilationIsLoading && uploadIsLoading ? (
                                <Loader size={20} color="white" />
                            ) : (
                                "Go!"
                            )}
                        </button>
                    </div>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="litinski_check1"
                        name="litinski"
                        checked={doLitinskiTransform}
                        onChange={(event) => setDoLitinskiTransform(event.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="litinski_check1">
                        Litinski Transform
                    </label>
                </div>
            </>
        </div>
    )
}

const UploadCircuit = ({ appState, setAppState }: AppStateProps) => (
    <>
        <h2 id="get-started" className="scroll-offset">
            Get Started - Upload a circuit
        </h2>
        <hr />
        <UploadACircuit setAppState={setAppState} appState={appState} />
        <SelectExampleCircuit setAppState={setAppState} appState={appState} />
    </>
)

export default UploadCircuit
