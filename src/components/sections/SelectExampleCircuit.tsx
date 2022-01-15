import { AppStateProps } from "../../appState"
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"
import submitCompileRequest from "../submitCompileRequest"
import Loader from "../Loader"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectExampleCircuit = ({ appState, setAppState }: AppStateProps): JSX.Element => {
    const [exampleIsLoading, setExampleIsLoading] = React.useState(false)

    const [doLitinskiTransform, setDoLitinskiTransform] = React.useState(true)

    const [circuitStr, setCircuitStr] = React.useState<string | null>(null)

    const [exampleCircuit, setExampleCircuit] = React.useState<string>("bell_pair.qasm")

    // Handle Dropdown Select change event
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setExampleCircuit(value)
        readCircuitFile(value)
    }

    // set circuitStr to the selected Example Circuit
    const readCircuitFile = (filename: string) => {
        const file_url = `${process.env.PUBLIC_URL}/assets/demo_circuits/${filename}`
        fetch(file_url)
            .then(function (response) {
                return response.text()
            })
            .then(function (data) {
                setCircuitStr(data)
            })
    }
    readCircuitFile(exampleCircuit)

    // TODO: forbid compile request submit with empty circuit
    return (
        <div>
            Or choose from the following example circuits:
            <div>
                <div className="input-group">
                    <select
                        className="form-select"
                        css={css`
                            max-width: 250px;
                        `}
                        name="circuit"
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select a Circuit
                        </option>
                        <option value="bell_pair.qasm">Bell Pair</option>
                        <option value="nontrivial_state.qasm">Non-trivial State</option>
                    </select>
                    <div className="input-group-append">
                        {/* <input type="submit" className="btn btn-info" value="Go!"/> */}
                        {/* When implemented, will be a button with onClick rather than html input */}
                        <button
                            css={css`
                                width: 100px;
                            `}
                            className="btn btn-primary"
                            disabled={appState.compilationIsLoading}
                            onClick={() => submitCompileRequest({appState, setAppState}, circuitStr as string,setExampleIsLoading, doLitinskiTransform)}
                        >
                            {appState.compilationIsLoading && exampleIsLoading ? (
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
                        id="litinski_check2"
                        name="litinski"
                        checked={doLitinskiTransform}
                        onChange={(event) => setDoLitinskiTransform(event.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="litinski_check2">
                        Litinski Transform
                    </label>
                </div>
            </div>
        </div>
    )
}

export default SelectExampleCircuit
