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
    if (!line || line.length <= 0){
      console.log('line failed')
      return { line, rawData }
    }
    line = line.replace(/\s+/g, ' ')
    line = line.replace(/\t/g, ' ')
    //remove from file
    if ( i === 0)
      console.log('zero index')
    rawData = rawData.slice(i > 0 ? i+ 1 : 0)
  return { line, rawData }
}


// const nextLine = (data, file, line) => {
//   data = getLine(file)
//   if (!data.line)
//     return { data, file, line }
//   line = data.line;
//   file = data.rawData;
//   return { data, file, line };
// }

const checkVersion = (raw) =>{

  
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
      line = raw.slice(0, i)
    }
  } else{
    return true
  }


  // let data = getLine(raw)
  // let line = data.line
  // let rawData = data.rawData
  // console.log(line)
  // while (line) {
  //   if (line.search(/VERS/i) >= 0 && line.search(/3.0/) >= 0) {
  //     console.log('found 3', line)
  //     return false
  //   } else if (line.search(/VERS/i) >= 0 && line.search(/2.0/) >= 0) {
  //     console.log('found 2', line)
  //     return true
  //   }
  //   data = getLine(raw)
  //   line = data.line
  //   rawData = data.rawData
  // }
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
    //let dataEntry = {}
    //let dataLine = 0
    let ascii = []
    while (line) {
      //if this is not the first chunk(section), check what section we are in
      line = line.trim()
      let chunk = parseInt(getState().lasFile.chunk, 10)
      if (chunk > 1) {
          section = getState().lasFile.section
        }
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
          dispatch(currentSection(section))
          if (section === 'CURVE_INFORMATION'){
            dispatch(reset())//rest at start of parsing ascii block
          }
        }
        else if (section === 'ASCII') {
          let values = line.split(/\s+/g).map(val => {
            return parseFloat(val)
          })
          ascii.push(values)
        }
        else {//not a heading
          //format MNEM.UNIT Data after unit space until colon: Description
          let i = line.search(/\.\s+/)
          let mnem = '', unit = '', data = '', desc = ''
          if (i > 0) {//found space after . (no units), parse of mnem
            mnem = line.slice(0, line.search(/\./))
            line = line.slice(line.search(/\./) + 1)
          }
          else {
            i = line.search(/\s/)
            mnem = line.slice(0, i)
            line = line.slice(i + 1)
            i = mnem.search(/\./)
            unit = mnem.slice(i + 1)
            mnem = mnem.slice(0, i)
          }
          //data and desc left
          line = line.trim()
          let dataAndDesc = line.split(/:/).map(val => {
            return val
          })
          if (dataAndDesc.length < 2)
            desc = dataAndDesc[0]
          else {
            data = dataAndDesc[0]
            desc = dataAndDesc[1]
          }
          let dataEntry = {
            mnem: mnem,
            unit: unit,
            data: data,
            desc: desc
          }
          // if (section === 'VERSION'){
          //   console.log(dataEntry)
          //   if (dataEntry.mnem === 'VERS' && parseFloat(dataEntry.data) > 2) {
          //     alert(`LAS Version ${dataEntry.data} files are not supported`)
          //     return
          //   }
          // }
  
          dispatch(addData(section, dataEntry))
        }
        data = getLine(rawData)
        line = data.line
        rawData = data.rawData
      }
      if (ascii.length){
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
  return line;
}

export default {
  parseFile,
  _openFile,
  openFile,
  addHeading,
  readingFile,
}



