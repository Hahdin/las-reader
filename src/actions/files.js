import types from '../types/types'
import {
  addSection,
  addData,
  addAscii,
  reset,
  currentSection,
} from './las'

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
    dispatch(openFile(file, rawData))
    dispatch(readingFile(true))
  }
}

export const getLine = (rawData) => {
  var i = rawData.indexOf('\n')
  let line = ''
  if (i < 0)
    return { line, rawData }
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
    //console.log('line', line)
    //remove from file
    if ( i == 0)
      console.log('zero index')
    rawData = rawData.slice(i > 0 ? i+ 1 : 0)
  return { line, rawData }
}


const nextLine = (data, file, line) => {
  data = getLine(file)
  if (!data.line)
    return { data, file, line }
  line = data.line;
  file = data.rawData;
  return { data, file, line };
}

export const parseFile = (rawData) => {

    return (dispatch, getState) => {

      let data = getLine(rawData)
      let line = data.line
      rawData = data.rawData// rawData with line removed

      //tracking
      let section = ''//the current section we are processing
      let dataEntry = {}
      let dataLine = 0
      let ascii = []
      while (line) {
        //if this is not the first chunk(section), check what section we are in
        line = line.trim()
        let chunk = parseInt(getState().lasFile.chunk )
        if (chunk > 1) {
          section = getState().lasFile.section
        }
        if (line.startsWith('#')) {//comment, skip
          data = getLine(rawData)
          line = data.line
          rawData = data.rawData
          continue
        }
        //console.log('line...')
        if (line.indexOf('~') >= 0) {//section heading
          line = getSections(line, dispatch)
          //console.log('1',line)
          section = line
          dispatch(addSection(line))
          dispatch(currentSection(section))
          if (section === 'ASCII'){
            //console.log('reset ascii block')
            dispatch(reset())//rest at start of parsing ascii block
          }
        }
        else if (section === 'ASCII') {
          let values = line.split(/\s+/g).filter(val => {
            return parseFloat(val)
          })
         // console.log(values)
          ascii.push(values)
        }
        else {//not a heading
          //format MNEM.UNIT Data after unit space until colon: Description
          //console.log('3', line)
          let i = line.search(/\.\s+/)
          let mnem = '', unit = '', data = '', desc = ''
          if (i > 0) {//found space after . (no units), parse of mnem
            mnem = line.slice(0, line.search(/\./))
            line = line.slice(line.search(/\./) + 1)
           // console.log('found space after .', mnem)
          }
          else {
            i = line.search(/\s/)
            //console.log('no space after .', i, line)
            mnem = line.slice(0, i)
            line = line.slice(i + 1)
            //console.log('mnem', mnem, '---',  line, i)
            i = mnem.search(/\./)
            unit = mnem.slice(i + 1)
            mnem = mnem.slice(0, i)
            //console.log('units', mnem, unit)
          }
          //data and desc left
          line = line.trim()
          let dataAndDesc = line.split(/:/).filter(val => {
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
          //console.log('2',dataEntry)
          dispatch(addData(section, dataEntry))
        }
        data = getLine(rawData)
        line = data.line
        rawData = data.rawData
      }
      if (ascii.length){
        //console.log('dispatch addAscii')
        dispatch(addAscii(ascii))
      }
    }
   // console.log('resolve')
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



