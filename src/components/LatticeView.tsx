/** @jsxImportSource @emotion/react */
import React, { useRef } from "react"
import { useState } from "react"
import { CompilationResult, Slice, VisualArrayCell } from "../slices"
import { PatchType, Orientation, EdgeType, ActivityType } from "../slices"
// import CompilationSwitch from "./CompilationSwitch"
import { css } from "@emotion/react"

type StylesMapType = {
    [key in Orientation | PatchType | EdgeType]: string
}

const styles_map: StylesMapType = {
    [PatchType.Qubit]: "darkkhaki",
    [PatchType.DistillationQubit]: "orchid",
    [PatchType.Ancilla]: "aquamarine",
    [Orientation.Top]: "top",
    [Orientation.Bottom]: "bottom",
    [Orientation.Left]: "left",
    [Orientation.Right]: "right",
    [EdgeType.Solid]: "solid",
    [EdgeType.SolidStiched]: "solid",
    [EdgeType.Dashed]: "dotted",
    [EdgeType.DashedStiched]: "dotted",
    [EdgeType.AncillaJoin]: "solid",
}

type StylesMapEdgeColorType = {
    [key in EdgeType]: string
}

const styles_map_edge_color: StylesMapEdgeColorType = {
    [EdgeType.Solid]: "black",
    [EdgeType.SolidStiched]: "#37beff",
    [EdgeType.Dashed]: "black",
    [EdgeType.DashedStiched]: "#37beff",
    [EdgeType.AncillaJoin]: "aquamarine",
}

type StylesMapActivityColorType = {
    [key in ActivityType]: string
}

const styles_map_activity_color: StylesMapActivityColorType = {
    [ActivityType.Unitary]: "#00baff",
    [ActivityType.Measurement]: "#ff0000",
}

const cellFontSize = (cell: VisualArrayCell) =>
    cell.text.length > 20 ? "14" : cell.text.length > 7 ? "18" : "30"

type CellViewerProps = {
    cell: VisualArrayCell
    row_idx: number
    col_idx: number
}
const CellViewer = ({ cell, row_idx, col_idx }: CellViewerProps) => {
    return (
        <div
            className="lattice-cell-inside"
            css={css`
                height: 100%;
                width: 100%;
                vertical-align: middle;
                display: inline-block;
                border-width: 4pt;
                border-style: solid;
                text-align: center;

                ${cell !== null && cell.patch_type === PatchType.Ancilla
                    ? "border-color: white"
                    : "border-color: transparent"};

                ${cell !== null &&
                `background-color: ${styles_map[cell.patch_type]};
                    ${Object.keys(cell.edges)
                        .map((orientation_string: string) => {
                            const orientation = orientation_string as Orientation
                            const edge_type = cell.edges[orientation] as EdgeType

                            return `border-${styles_map[orientation]}-style: ${styles_map[edge_type]};
                        border-${styles_map[orientation]}-color: ${styles_map_edge_color[edge_type]};
                        `
                        })
                        .join("\n")};
                    ${
                        cell.activity !== null &&
                        `background-image: radial-gradient(${
                            styles_map_activity_color[cell.activity.activity_type]
                        } 7%, transparent 90%)
                            `
                    }`}
            `}
        >
            <span
                css={css`
                    color: #686c6d;
                `}
            >
                ({col_idx},{row_idx})
            </span>
            <br />
            <span>
                {cell?.text && (
                    <p className="qubit-state">
                        <span
                            css={css`
                                font-size: ${cellFontSize(cell)}px;
                            `}
                        >
                            <b>{cell.text}</b>
                        </span>
                    </p>
                )}
            </span>
        </div>
    )
}

type SliceViewerProps = {
    slice: Slice
}
const SliceViewer = ({ slice }: SliceViewerProps) => (
    <div className="slice grid">
        {slice.map((row, row_idx) => (
            <div className="lattice-row row flex-nowrap" key={row_idx}>
                {row.map((cell, col_idx) => (
                    <div className="lattice-cell ratio ratio-1x1 col" key={col_idx}>
                        <CellViewer cell={cell} row_idx={row_idx} col_idx={row_idx} key={col_idx} />
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
        scrollToLattice()
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

    // scroll into Lattice View, after slice navigation buttons pressed
    const latticeSlices = useRef<HTMLInputElement>(null)
    const scrollToLattice = () => {
        latticeSlices.current && latticeSlices.current?.scrollIntoView()
    }

    // set state of checkbox switch
    const [showCompilationText, setCompilationText] = useState(false)
    const handleChange = () => {
        setCompilationText(!showCompilationText)
    }

    return (
        <div id="lattice-view-output">
            <h2 ref={latticeSection} className="scroll-margin">
                {" "}
                Lattice Viewer{" "}
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
            <div className="d-flex mt-1 scroll-margin" ref={latticeSlices}>
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

            <div id="draggable-container" className="mt-2">
                <SliceViewer slice={slices[selectedSliceNumber]} />
            </div>

            <div className="p-3">
                <a href="/" className="btn btn-info p-2">
                    New Circuit
                </a>
            </div>
        </div>
    )
}

export default LatticeView
