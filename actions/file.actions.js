import { fileConstants } from '../constants';
let versionPassed = false

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
  //console.log(raw)
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
  if (line.search(/~P\w?/i) >= 0) {
    line = 'PARAMETER_INFORMATION';
  }
  return line;
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
      let chunk = parseInt(getState().files.chunk, 10)
      if (chunk > 1) {
        section = getState().files.section
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
          dispatch(reset())//reset at start of parsing ascii block
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
        //let rgData = /([A-Za-z0-9_()]+)\s*[.](\S*)\s+(\w+)[:\s+]\s*(.*)/.exec(line)

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

export const addSection = (section) => {
  return ({
    type: fileConstants.ADD_SECTION,
    section: section,
  })
}

export const currentSection = (section) =>{
  return ({
    type: fileConstants.CURRENT_SECTION,
    section: section
  })
}
export const reset = () =>{
  return ({
    type: fileConstants.RESET_LAS,
  })
}
export const addData = (section, data) =>{
  return ({
    type: fileConstants.ADD_DATA,
    section: section,
    data: data,
  })
}
export const addAscii = ( data) =>{
  return ({
    type: fileConstants.ADD_ASCII,
    data: data,
  })
}

export const openFile = (file, rawData) => {
  console.log(rawData)
  return ({
    type: fileConstants.OPEN_FILE,
    file: file,
    raw: rawData
  })
}
export const chartCurve = (curve) =>{
  return ({
    type: fileConstants.CHART_CURVE,
    curve: curve
  })
}

export default {
  openFile,
  parseFile,
  addSection,
  addData,
  addAscii,
  reset,
  currentSection,
  chartCurve,
}
