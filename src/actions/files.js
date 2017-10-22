import types from '../types/types'
import {
  addSection,
  addData,
  addAscii,
  reset,
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

//thunks - testing
export const _openFile = (file, rawData) => {
  return (dispatch, getState) => {
    dispatch(openFile(file, rawData))
    dispatch(readingFile(false))
  }
}

export const getLine = (rawData) => {
  var i = rawData.indexOf('\n')
  let ii = rawData.search(/\n/g)
  //console.log('i, ii', i, ii)
  if (i === RangeError){
    console.log('range error')
    return ''
  }

  //console.log('getLine', i)
  let line = ''
  if (i < 0)
    return { line, rawData }
  //try {
    line = rawData.slice(0, i).replace(/\t|\r|\"/g, '')
    if (!line.length) {
      console.log('empty')
      return { line, rawData }
    }
    //console.log('b4 replace', line, i)
    if (!line || line.length <= 0){
      console.log('line failed')
      return { line, rawData }
    }
    line = line.replace(/\s+/g, ' ')
    //remove from file
    if ( i == 0)
      console.log('zero index')
    rawData = rawData.slice(i > 0 ? i+ 1 : 0)
  //}
  //catch (e) {
  //  console.log('error', e)
  //  return { line, rawData }
  //}
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

export const parseFile = (file) => {
  return (dispatch, getState) => {
    let section = ''
    let ascii = []
    dispatch(readingFile(true))
    const nextLineFromFile = (file) => {
      try{
      if (!file.length) {
        dispatch(readingFile(false))
        console.log('1')
        return
      }
      let data// = getLine(file)
      let line// = data.line.replace(/\s+/g, ' ')
      ({ data, file, line } = nextLine(data, file, line))
      file = data.rawData// rawData with line removed
      //console.log('remaining', file.length)
      if (!file){
        console.log('2')
        
        return
      }
      if (!line){
        console.log('3')
        
        return file.length ? nextLineFromFile(file) : null
      }

      if (line.startsWith('#')) {//comment, skip

        return file.length ? nextLineFromFile(file) : null
      }
      if (line.startsWith('~')) {//section heading
        line = getSections(line, dispatch)
        section = line
        dispatch(addSection(line))
        console.log('get section..',section)
        
        return file.length ? nextLineFromFile(file) : null
      }
      else if (section === 'ASCII') {
        // let values = line.split(/\s+/g).filter(val => {
        //   return parseFloat(val)
        // })
        // ascii.push(values)
        ascii.push(line)
        //console.log('get ascii...')
        return file.length ? nextLineFromFile(file) : null
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
        dispatch(addData(section, dataEntry))
        console.log('4')
        return file.length ? nextLineFromFile(file) : null
      }
      }
      catch (err) {
        console.log('5: caught err', err)
        return
      }
    }
    if (file.length) {
      console.log('start')
      nextLineFromFile(file)
      console.log('save ascii')
      dispatch(addAscii(ascii))
      console.log('set reading to false')
      dispatch(readingFile(false))
      console.log('finished')
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



