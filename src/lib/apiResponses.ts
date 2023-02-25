import type { Slices } from "./slices"

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
    slices: Slices
    compilation_text: string

    constructor(slices: Slices, compilation_text: string) {
        this.slices = slices
        this.compilation_text = compilation_text
    }
}

export type ApiResponse = null | CompilationResultSuccess | ResponseError
