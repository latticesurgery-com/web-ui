export enum SimulationMethod {
    None,
    StateVector,
    LazilyTensoredStateVector,
}

export interface LitinskiCompilationOptions {
    readonly doStabilizerCommutingTransform: boolean
    readonly simulationMethod: SimulationMethod
}

export enum LayoutType {
    Fast,
    Compact,
}

export enum CorrectiveTermBehaviour {
    Never,
    Allways,
    Random,
}

export interface FastSlicerOptions {
    readonly layoutType: LayoutType
    readonly correctiveTermBehaviour: CorrectiveTermBehaviour
}

export interface CompilationOptions {
    kind: "FastSlicerOptions" | "LitinskiCompilationOptions"
    fastSlicerOptions: FastSlicerOptions
    litinskiCompilationOptions: LitinskiCompilationOptions
}

export const defaultCompilationOptions: CompilationOptions = {
    kind: "FastSlicerOptions",
    fastSlicerOptions: {
        layoutType: LayoutType.Compact,
        correctiveTermBehaviour: CorrectiveTermBehaviour.Allways,
    },
    litinskiCompilationOptions: {
        doStabilizerCommutingTransform: true,
        simulationMethod: SimulationMethod.LazilyTensoredStateVector,
    },
}
