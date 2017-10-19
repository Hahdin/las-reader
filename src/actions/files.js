import {getLine, processLine, processLineNoFormat} from '../utils/lib'
import types from '../types/types'

export const saveJSON = (json) => {
  return ({
    type: types._JSON,
    object: json,
  })
}

export const incrementData = () => {
  return ({
    type: types.INC_DATA,
  })
}

export const fileStateAscii = (bool) => {
  return ({
    type: types.FILE_STATE_ASCII,
    bool: bool,
  })
}
export const fileStateFirst = (bool) => {
  return ({
    type: types.FILE_STATE_FIRST,
    bool: bool,
  })
}

export const resetFilestate = () => {
  return ({
    type: types.RESET_FILESTATE,
  })
}
export const addHeading = () => {
  return ({
    type: types.ADD_HEADING,
  })
}
export const openFile = (file, rawData) => {
  return ({
    type: types.OPEN_FILE,
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
      processedLine += processLineNoFormat(line, dispatch, getState)
      data = getLine(rawData)
      line = data.line
      console.log(line)
      rawData = data.rawData
    }
    //console.log('finally', processedLine)
    dispatch(saveJSON(processedLine))
    dispatch(resetFilestate())
  }
}

export default {
  parseFile,
  _openFile,
  openFile,
  addHeading,
  resetFilestate,
  fileStateFirst,
  fileStateAscii,
  incrementData,
  saveJSON,  
}


