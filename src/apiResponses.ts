import {Slices} from "./slices";

// Different classes representing possible Api Response outcomes
class JsonParseError {
  msg: string
  constructor(msg : string) {
    this.msg = msg
  }
}

class ApiHttpError {
  code: number
  msg: string
  headers: string
  constructor(code: number, msg : string, headers: string) {
    this.code = code
    this.msg = msg
    this.headers = headers
  }
}

class CompilerError {
  msg: string
  errortype: string
  constructor(msg: string, errortype: string){
    this.msg = msg
    this.errortype = errortype;
  }
}

class CompilationResultSuccess {
  slices: Slices
  compilation_text: string
  constructor(slices : Slices, compilation_text : string) {
    this.slices = slices
    this.compilation_text = compilation_text
  }
}

class NoServerResponse {
  response: string
  constructor(response: string) {
    this.response = response
  }
}

type ApiResponse = null | JsonParseError | ApiHttpError | CompilationResultSuccess | CompilerError | NoServerResponse;

export type {ApiResponse}

export {JsonParseError,ApiHttpError,CompilationResultSuccess,NoServerResponse,CompilerError}