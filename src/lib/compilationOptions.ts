export enum SimulationMethod {
    // None,
    StateVector,
    // LazilyTensoredStateVector,
}

export interface LitinskiCompilationOptions {
    readonly doStabilizerCommutingTransform: boolean
    readonly simulationMethod: SimulationMethod
}

export enum LayoutType {
    Compact = "compact",
    EDPC = "edpc",
}

export enum CorrectiveTermBehaviour {
    Never = "never",
    Always = "always",
}

export enum InputType {
    LLI,
    QASM,
    // Random,
}

export interface FastSlicerOptions {
    readonly layoutType: LayoutType
    readonly correctiveTermBehaviour: CorrectiveTermBehaviour
}

export interface CompilationOptions {
    kind: "FastSlicerOptions" | "LitinskiCompilationOptions"
    fastSlicerOptions: FastSlicerOptions
    litinskiCompilationOptions: LitinskiCompilationOptions
    inputType: InputType
}

export const defaultCompilationOptions: CompilationOptions = {
    kind: "FastSlicerOptions",
    fastSlicerOptions: {
        layoutType: LayoutType.Compact,
        correctiveTermBehaviour: CorrectiveTermBehaviour.Always,
    },
    litinskiCompilationOptions: {
        doStabilizerCommutingTransform: true,
        simulationMethod: SimulationMethod.StateVector, // TODO change to LazilyTensoredStateVector once enabled
    },
    inputType: InputType.LLI,
}
