import {getLine, processLine} from '../utils/lib'

export const OPEN_FILE = 'OPEN_FILE'
export const PARSE_FILE = 'PARSE_FILE'
export const FILE_STATE_ASCII = 'FILE_STATE_ASCII'
export const FILE_STATE_FIRST = 'FILE_STATE_FIRST'
export const ADD_HEADING = 'ADD_HEADING'
export const INC_DATA = 'INC_DATA'
export const RESET_FILESTATE = 'RESET_FILESTATE'
export const _JSON = '_JSON'

export const saveJSON = (json) => {
  return ({
    type: _JSON,
    object: json,
  })
}

export const incrementData = () => {
  return ({
    type: INC_DATA,
  })
}

export const fileStateAscii = (bool) => {
  return ({
    type: FILE_STATE_ASCII,
    bool: bool,
  })
}
export const fileStateFirst = (bool) => {
  return ({
    type: FILE_STATE_FIRST,
    bool: bool,
  })
}

export const resetFilestate = () => {
  return ({
    type: RESET_FILESTATE,
  })
}
export const addHeading = () => {
  return ({
    type: ADD_HEADING,
  })
}
export const openFile = (file, rawData) => {
  return ({
    type: OPEN_FILE,
    file: file,
    raw: rawData
  })
}

//thunks - testing
export const _openFile = (file, rawData) =>{
  return (dispatch, getState) => {
    dispatch(openFile(file, rawData))
  }
}

export const parseFile = (rawData) =>{
  return (dispatch, getState) =>{
    let data = getLine(rawData)
    let line = data.line
    rawData = data.rawData// rawData with line removed
    let processedLine = ''
    while (line && line.length > 0){
      processedLine += processLine(line, dispatch, getState)
      data = getLine(rawData)
      line = data.line
      rawData = data.rawData
    }
    console.log('finally', processedLine)
    dispatch(saveJSON(processedLine))
    dispatch(resetFilestate())
  }
}


