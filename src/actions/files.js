import { getLine, processLine, processLineNoFormat } from '../utils/lib'
import types from '../types/types'
import { addSection, addData, addAscii, reset } from './las'
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
export const _openFile = (file, rawData) => {
  return (dispatch, getState) => {
    dispatch(openFile(file, rawData))
  }
}

export const parseFile = (rawData) => {
  return (dispatch, getState) => {
    dispatch(reset())
    let data = getLine(rawData)
    let line = data.line
    rawData = data.rawData// rawData with line removed

    //tracking
    let section = ''//the current section we are processing
    let dataEntry = {}
    let dataLine = 0
    while (line && line.length > 0) {
      if (line.startsWith('#')) {//comment, skip
        data = getLine(rawData)
        line = data.line
        rawData = data.rawData
        continue
      }
      if (line.indexOf('~') >= 0) {//section heading
        line = getSections(line, dispatch)
        section = line
        dispatch(addSection(line))
      }
      else if (section === 'ASCII'){
        dataLine ++
        //data block
        //grab the line, we can parse it out later
        dispatch(addAscii(dataLine, line))
      }
      else {//not a heading
        let dataLine = line.split(/\s{2,}/i)// separated by 2 or more spaces
        if (dataLine.length) {
          dataLine.forEach((item, i) => {
            if (i == 0) {
              dataEntry.mnem = item// data after the . is units (optional)
            }
            //second will be data
            if (i == 1){
              if (item.startsWith(':'))
                dataEntry.desc = item
              else
                dataEntry.data = item
            }
            if (i == 2)// desc
            dataEntry.desc = item
          })
          dispatch(addData(section, dataEntry))
          dataEntry = {}
        }
      }
      data = getLine(rawData)
      line = data.line
      rawData = data.rawData
    }
  }
}

const getSections = (line, dispatch) => {
  if (line.search(/~a\w?/i) >= 0) {
    dispatch(fileStateAscii(true))
    line = 'ASCII';
  }
  if (line.search(/~V\w?/i) >= 0) {
    line = 'VERSION';
  }
  if (line.search(/~W\w?/i) >= 0) {
    line = 'WELL';
  }
  if (line.search(/~C\w?/i) >= 0) {
    line = 'CURVE_INFORMATION';
  }
  return line;
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


