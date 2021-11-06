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
    
    const slices_len = slices.length
    // JS object that returns boolean when "previous" or "next" buttons need to be disabled
    const disable = {
        "prev": (selectedSliceNumber===0) ? true : false,
        "next": (selectedSliceNumber===slices_len-1) ? true : false 
    }

    return <div id="lattice-view-output">
        <h2> Lattice Viewer </h2>
        <hr/>
        {
        /* Old Toolbar
        <div id="toolbar">
            &nbsp;&nbsp;
            <span css={css`border: solid 0.5vh gray;`}>
                &nbsp;Select Time Slice:
                &nbsp;
                <button className="btn btn-info" onClick={() => changeSlice(-1)}>Prev</button>
                &nbsp;<span id="slice-number" />&nbsp;
                <button className="btn btn-info" onClick={() => changeSlice(+1)}>Next</button>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <button className="btn btn-info">Compilation Text</button>
                <a href="javascript:(function(){$('#compilation-text').slideToggle()})()">Compilation</a>
                &nbsp;&nbsp;
            </span>
        </div>  */}

        {/* Updated Toolbar */}
        <div id="slice-toolbar" className="lattice-card shadow">
            <div className="card-body center">
                <h5 className="card-title center">Select Time Slice </h5>
                <div className="card-text center">Slice {selectedSliceNumber+1} / {slices_len}</div>
                {/* <hr css={css`width:100px; margin: auto`}/> */}
                <div className="btn-toolbar" role="toolbar" css={css`justify-content:center;`}>
                    <div className="btn-group me-2" role="group">
                        <button disabled={disable["prev"]} onClick={() => changeSlice(-1)} className="btn btn-primary">Prev</button>
                    </div>
                    <div className="btn-group me-2" role="group">
                        <button disabled={disable["next"]} onClick={() => changeSlice(+1)} className="btn btn-primary">Next</button>
                    </div>
                    {/* {selectedSliceNumber} */}
                </div>
                
                {/* <button className="btn btn-primary">Compilation Text</button> */}
            </div>
        </div>

        <div id="compilation-text" css={css`display: none`}>
            <pre>{compilationText}</pre>
        </div>
        <div id="draggable-container" className="mt-5">
            <SliceViewer slice={slices[selectedSliceNumber]} />
        </div>
    </div>
};



export default LatticeView;
