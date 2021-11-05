/** @jsxImportSource @emotion/react */
import React from 'react';
import {CompilationResult, Slice, VisualArrayCell} from "../slices";
import {css} from "@emotion/react";
// import $ from "jquery"


const cellFontSize = (cell : VisualArrayCell) =>
    cell.text.length > 20
        ? "7"
        : cell.text.length > 7 ? "9" : "15"

type CellViewerProps = {
    cell: VisualArrayCell
    row_idx: number
    col_idx: number
}
const CellViewer = ({cell, row_idx, col_idx}: CellViewerProps) => {
    return <div
            className="lattice-cell-inside"
            css={css`height: 50pt;
                  width: 50pt;
                  vertical-align: middle;
                  display: inline-block;
                  border-width: 4pt;
                  border-style: solid;
                  text-align: center;`}>
        <span css={css`color: #686c6d`}>
            ({col_idx},{row_idx})
        </span>
        <br />
        <span>
            {cell?.text &&
                <p className="qubit-state">
                    <span css={css`font-size: ${cellFontSize(cell)}px`}>
                        <b>{cell.text}</b>
                    </span>
                </p>
            }
        </span>
    </div>
}


type SliceViewerProps = {
    slice: Slice
}
const SliceViewer = ({slice} : SliceViewerProps) =>
    <div className="slice">
        {slice.map((row, row_idx) =>
            <div className="lattice-row" key={row_idx}>
                {row.map((cell, col_idx) =>
                    <CellViewer cell={cell} row_idx={row_idx} col_idx={row_idx} key={col_idx}/>
                )}
            </div>
        )}
    </div>


type LatticeViewProps = {
    compilationResult : CompilationResult
}
const LatticeView = ({compilationResult} : LatticeViewProps) => {
    const [selectedSliceNumber, setSelectedSliceNumber] = React.useState<number>(0);
    const changeSlice = (delta: number) => setSelectedSliceNumber(selectedSliceNumber+delta)

    const {compilationText, slices} = compilationResult

    return <div id="lattice-view-output">
        <div id="toolbar">
            &nbsp;&nbsp;
            <span css={css`border: solid 0.5vh gray;`}>
                &nbsp;Select Time Slice:
                &nbsp;
                <a onClick={() => changeSlice(-1)}>Prev</a>
                &nbsp;<span id="slice-number" />&nbsp;
                <a onClick={() => changeSlice(+1)}>Next</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="javascript:(function(){$('#compilation-text').slideToggle()})()">Compilation</a>
                &nbsp;&nbsp;
            </span>
        </div>
        <div id="compilation-text" css={css`display: none`}>
            <pre>{compilationText}</pre>
        </div>
        <div id="draggable-container">
            <SliceViewer slice={slices[selectedSliceNumber]} />
        </div>
    </div>
};



export default LatticeView;
