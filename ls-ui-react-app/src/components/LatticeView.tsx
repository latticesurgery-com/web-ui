import React from 'react';
import {Slices} from "../slices";

type LatticeViewProps = {
    slices: Slices
    compilation_text: string
}

const LatticeView = ({slices} : LatticeViewProps) => {
    return <pre>{JSON.stringify(slices)}</pre>;
};



export default LatticeView;
