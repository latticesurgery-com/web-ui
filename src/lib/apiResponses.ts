import type { CompilationResult } from "./slices"

// Different classes representing possible Api Response outcomes
export class ResponseError {
    title: string
    msg: string

    constructor(title: string, msg: string) {
        this.title = title
        this.msg = msg
    }
}

export class CompilationResultSuccess {
    compilation_result: CompilationResult

    constructor(compilation_result: CompilationResult) {
        this.compilation_result = compilation_result
    }
}

export type ApiResponse = null | CompilationResultSuccess | ResponseError
