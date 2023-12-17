import {SliceAnnotations} from './sliceAnnotations'

// These types mirror the ones used by lsqecc.lattice_array and are used to interpret the calls to
// lsqecc.pipeline.json_pipeline (i.e. what you get by calling api.latticesurgery.com/compile).
// The reason for this exact mirroring is so that the output json can be generated directly from the internal python
// datastructures used to make the lattice

// Type mirroring Orientation in lsqecc.patches
enum Orientation {
    Top = "Top",
    Bottom = "Bottom",
    Left = "Left",
    Right = "Right",
}

// Type mirroring EdgeType in lsqecc.patches
enum EdgeType {
    Solid = "Solid",
    SolidStiched = "SolidStiched",
    Dashed = "Dashed",
    DashedStiched = "DashedStiched",
    AncillaJoin = "AncillaJoin",
}

// Type mirroring PatchType in lsqecc.patches
enum PatchType {
    Qubit = "Qubit",
    DistillationQubit = "DistillationQubit",
    Ancilla = "Ancilla",
}

// Type mirroring PauliOperator in lsqecc.pauli_rotations.rotation
enum PauliOperator {
    I = "I",
    X = "X",
    Y = "Y",
    Z = "Z",
}

// Type mirroring QubitActivity in lsqecc.simulation.qubit_state
enum ActivityType {
    Unitary = "Unitary",
    Measurement = "Measurement",
}

// Type mirroring QubitActivity in lsqecc.simulation.qubit_state
type QubitActivity = {
    op: PauliOperator
    activity_type: ActivityType
}

// Auxiliary Type representing an object mapping from Orientation to edge type (as in VisualArrayCell)
type Edges = {
    [key in Orientation]: EdgeType
}

// Type mirroring VisualArrayCell in lsqecc.lattice_array
type VisualArrayCell = {
    edges: Edges
    patch_type: PatchType
    text: string
    activity: QubitActivity
}

// 2D array of visual cells. These are the sqares on the grid. Outer array is Rows, inner is cell.
type Slice = Array<Array<VisualArrayCell>>

// Slices is the datatype representing the datatype of Lattice Surgery Computation Slices, we build it piece by piece.
type Slices = Array<Slice>

type CompilationResult = {
    slices: Slices
    slice_annotations?: SliceAnnotations
    compilation_text: string
}

export type {
    Slice,
    Slices,
    Edges,
    QubitActivity,
    PauliOperator,
    VisualArrayCell,
    CompilationResult,
}

export { Orientation, EdgeType, PatchType, ActivityType }
