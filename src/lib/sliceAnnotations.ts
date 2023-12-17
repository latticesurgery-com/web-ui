type InstructionAnnotation = {
    instruction_text: string
}

type SliceAnnotation = {
    instuction_annotations:  Array<InstructionAnnotation>
}

type SliceAnnotations = Array<SliceAnnotation>

export type {
    SliceAnnotation,
    SliceAnnotations
}