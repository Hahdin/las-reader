import types from '../types/types'
import {
  addSection,
  addData,
  addAscii,
  reset,
  currentSection,
} from './las'

let versionPassed = false
export const readingFile = (bool) => {
  return ({
    type: types.READING_FILE,
    bool
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

export const _openFile = (file, rawData) => {
  return (dispatch, getState) => {
    versionPassed = false
    dispatch(reset())
    dispatch(openFile(file, rawData))
    dispatch(readingFile(true))
  }
}

export const getLine = (rawData) => {
  var i = rawData.indexOf('\n')
  let line = ''
  if (i < 0)
    return { line, rawData }
  // eslint-disable-next-line
  line = rawData.slice(0, i).replace(/\"/g, '')
  if (!line.length) {
    console.log('empty')
    return { line, rawData }
  }
  if (!line || line.length <= 0) {
    console.log('line failed')
    return { line, rawData }
  }
  line = line.replace(/\s+/g, ' ')
  line = line.replace(/\t/g, ' ')
  //remove from file
  if (i === 0)
    console.log('zero index')
  rawData = rawData.slice(i > 0 ? i + 1 : 0)
  return { line, rawData }
}

const checkVersion = (raw) => {
  console.log(raw)
  let i = raw.indexOf('\n')
  if (i >= 0) {
    let line = raw.slice(0, i)
    while (line) {
      if (line.search(/VERS/i) >= 0) {
        if (line.search(/3/i) >= 0) {
          return false
        }
        if (line.search(/2/i) >= 0) {
          versionPassed = true
          return true
        }
      }
      raw = raw.slice(i > 0 ? i + 1 : 0)
      i = raw.indexOf('\n')
      if ( i < 0)
        return true
      line = raw.slice(0, i)
    }
  } else {
    return true
  }
  return true
}

export const parseFile = (rawData) => {

  return (dispatch, getState) => {
    if (!versionPassed && !checkVersion(rawData.slice(0))) {
      alert(`*Only LAS Version 2.0 files are supported`)
      throw Error('Bad Version')
    }
    let data = getLine(rawData)
    let line = data.line
    rawData = data.rawData// rawData with line removed
    //tracking
    let section = ''//the current section we are processing
    let ascii = []
    while (line) {
      //if this is not the first chunk(section), check what section we are in
      line = line.trim()
      
        
      let chunk = parseInt(getState().lasFile.chunk, 10)
      if (chunk > 1) {
        section = getState().lasFile.section
      }
      if (line.startsWith('#') || line.length === 0) {//comment or empty line, skip
        data = getLine(rawData)
        line = data.line
        rawData = data.rawData
        continue
      }
      if (line.search(/~/) === 0) {//section heading
        line = getSections(line, dispatch)
        section = line
        dispatch(addSection(line))
        dispatch(currentSection(section))
        if (section === 'CURVE_INFORMATION') {
          dispatch(reset())//rest at start of parsing ascii block
        }
      }
      else if (section === 'ASCII') {
        let values = line.split(/\s+/g).map(val => {
          return parseFloat(val)
        })
        ascii.push(values)
      }
      else if (section === 'OTHER_INFORMATION') {
        //skip for now
      }
      else {//not a heading
        //format MNEM.UNIT Data after unit space until colon: Description
        let mnem = '', unit = '', data = '', desc = ''
        let rgData = /([A-Za-z0-9_()]+)\s*[.](\S*)\s+(.*)[:]\s*(.*)/.exec(line)
        if ( rgData){
          mnem = rgData[1]
          unit = rgData[2]
          data = rgData[3]
          desc = rgData[4]
        } else{
          console.log('??', line)
          return
        }
        mnem.toUpperCase()
        let dataEntry = {
          mnem: mnem,
          unit: unit,
          data: data,
          desc: desc
        }
        if ( section === "VERSION" && mnem === 'WRAP'){
          let t = data
          t.toUpperCase()
          t = t.trim()
          if (t === 'YES'){
            alert('WRAPPED Las files are not supported')
            throw Error('WRAPPED Las files are not supported')
          }
        }
        dispatch(addData(section, dataEntry))
      }
      data = getLine(rawData)
      line = data.line
      rawData = data.rawData
    }
    if (ascii.length) {
      dispatch(addAscii(ascii))
    }
  }
}

const getSections = (line, dispatch) => {
  if (line.search(/~a\w?/i) >= 0) {
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
  if (line.search(/~O\w?/i) >= 0) {
    line = 'OTHER_INFORMATION';
  }
  return line;
}

export default {
  parseFile,
  _openFile,
  openFile,
  addHeading,
  readingFile,
}



