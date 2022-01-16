/** @jsxImportSource @emotion/react */
import React, { useRef } from "react"
import { useState } from "react"
import { CompilationResult, Slice } from "../../slices"
import CellViewer from "../CellViewer"
import { css } from "@emotion/react"
import "./LatticeView.css"
import Draggable from "react-draggable" // The default

type SliceViewerProps = {
    slice: Slice
}
const SliceViewer = ({ slice }: SliceViewerProps) => (
    <div className="slice grid">
        {slice.map((row, row_idx) => (
            <div className="lattice-row row flex-nowrap" key={row_idx}>
                {row.map((cell, col_idx) => (
                    <div className="lattice-cell ratio ratio-1x1 col" key={col_idx}>
                        <CellViewer cell={cell} row_idx={row_idx} col_idx={col_idx} key={col_idx} />
                    </div>
                ))}
            </div>
        ))}
    </div>
)

type LatticeViewProps = {
    compilationResult: CompilationResult
}
const LatticeView = ({ compilationResult }: LatticeViewProps): JSX.Element => {
    const [selectedSliceNumber, setSelectedSliceNumber] = React.useState<number>(0)
    const changeSlice = (delta: number) => {
        setSelectedSliceNumber(selectedSliceNumber + delta)
    }
    const { compilation_text, slices } = compilationResult
    const slices_len = slices.length
    // JS object that returns boolean when "previous" or "next" buttons need to be disabled
    const disable = {
        prev: selectedSliceNumber === 0,
        next: selectedSliceNumber === slices_len - 1,
    }

    // scroll into Lattice View Section, one time, after compilation is completed
    const latticeSection = useRef<HTMLInputElement>(null)
    React.useEffect(() => {
        latticeSection.current && latticeSection.current?.scrollIntoView()
    }, [])

    // set state of checkbox switch
    const [showCompilationText, setCompilationText] = useState(true)
    const handleChange = () => {
        setCompilationText(!showCompilationText)
    }

    return (
        <div id="lattice-view-output">
            <h2 ref={latticeSection} className="scroll-margin">
                Lattice Viewer
            </h2>
            <hr />

            <div className="form-check form-switch p-1">
                <div className="form-check form-switch">
                    <input
                        className="form-check-input lg-checkbox"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onChange={handleChange}
                        defaultChecked={true}
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                        View Compilation
                    </label>
                </div>
            </div>

            <div className="p-1 vertical-center">
                <div>
                    {showCompilationText ? (
                        <div
                            id="compilation-text"
                            className="mb-3"
                            css={css`
                                margin-left: 10px;
                            `}
                        >
                            <pre>{compilation_text}</pre>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Updated Toolbar */}
            <div className="d-flex mt-1 scroll-margin">
                <div
                    id="slice-toolbar"
                    className="lattice-card shadow"
                    css={css`
                        flex-grow: 0;
                        flex-shrink: 0;
                        align-self: flex-start;
                    `}
                >
                    <div className="card-body center">
                        <h5 className="card-title center">Select Time Slice </h5>
                        <div className="card-text center">
                            Slice {selectedSliceNumber + 1} / {slices_len}
                        </div>
                        {/* <hr css={css`width:100px; margin: auto`}/> */}
                        <div
                            className="btn-toolbar"
                            role="toolbar"
                            css={css`
                                justify-content: center;
                            `}
                        >
                            <div className="btn-group me-2" role="group">
                                <button
                                    disabled={disable["prev"]}
                                    onClick={() => changeSlice(-1)}
                                    className="btn btn-primary"
                                >
                                    Prev
                                </button>
                            </div>
                            <div className="btn-group me-2" role="group">
                                <button
                                    disabled={disable["next"]}
                                    onClick={() => changeSlice(+1)}
                                    className="btn btn-primary"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Draggable>
                <div id="draggable-container" className="mt-2">
                    <SliceViewer slice={slices[selectedSliceNumber]} />
                </div>
            </Draggable>

            <div className="p-3">
                <a href="/" className="btn btn-info p-2">
                    New Circuit
                </a>
            </div>
        </div>
    )
}

export default LatticeView
