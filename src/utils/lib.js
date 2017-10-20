import {
  fileStateAscii,
  fileStateFirst,
  addHeading,
  incrementData
} from '../actions/files'
import {
  addSection,
} from '../actions/las'

export const getLine = (rawData) => {
  var i = rawData.indexOf('\n')
  if (i < 0)
    return ''
  var line = rawData.slice(0, i)
  //remove from file
  rawData = rawData.slice(i + 1)
  return { line, rawData }
}
const getCurrentHeadings = (getState) =>{ 
  return getState().files['FILE_STATE'].headings
}
const getCurrentDataCount = (getState) =>{
  return getState().files['FILE_STATE'].dataCount
}
const IsAscii = (getState) =>{
  return getState().files['FILE_STATE'].IsAscii
}
const IsFirst = (getState) =>{
  return getState().files['FILE_STATE'].IsFirst
}




export const processLine = (line, dispatch, getState) => {
  if (line.startsWith('#'))//comment, skip
    return ''
  let qt = '"'
  let unit = 'UNIT": '
  let data = 'DATA": '
  let desc = 'DESC": '
  let comma = ', '
  let rtn = ''
  let bHeading = false
  let tab = '\t'
  let nullValue = -999.25

  line = line.trim()
  //replace tabs with spaces
  line = line.replace(/\t+/g, ' ')
  if (line.indexOf('~') >= 0) {
    line = getSections(line, dispatch);
    //remove tiddle, replace with underscore
    line = line.replace('~', '_')
    //replace whitespace with underscore
    line = line.replace(' ', '_')
    tab = '\t'
    bHeading = true;
    dispatch(fileStateFirst(true))
    if (getCurrentHeadings(getState) > 0) {//finish off last heading
      rtn = '\r\t},\r'
      rtn += tab + '"' + line + '": {\r'
    }
    else {
      rtn = tab + qt + line + '": {\r'
    }
    dispatch(addHeading())
    return rtn;
  }
  else if (IsAscii(getState)) {
    line = line.replace(/\s+/g, ',')//replace whitespaces with comma
    line = line.replace('\t', ',')
    //JSON arrays cannot leave blank (,,) values, if more than 1 missing value will fail
    line = line.replace(',,', ',' + nullValue + ', ');
    dispatch(incrementData())
    let ch = "DATA" + (getCurrentDataCount(getState) + 1) + '":'
    rtn = tab + tab + qt + ch + '[' + line + ']'
    if (!IsFirst(getState)) {
      //not the first set of params for this heading, add the end of last line
      rtn = ',\n' + rtn;
    }
    dispatch(fileStateFirst(false))
    return rtn;
  }
  else { //not a heading
    //not a heading, parse "name": value
    let t, r;
    let checkWrap = false
    let isNull = false
    let bHasUnits = line.indexOf('. ') < 0
    let x = line.indexOf('.')
    if (x < 0)
      return ''
    t = line.slice(0, x)
    t.trim()

    // check mnem for the null value
    if (t.search(/null/i) >= 0)
      isNull = true

    if (t.search(/WRAP/) >= 0)
      checkWrap = true

    r = tab + tab + qt + t + qt + ': {'
    if (!IsFirst(getState)) {
      //not the first set of params for this heading, add the end of last line
      r = ',\n' + r
    }
    line = line.slice(x + 1)
    line = line.trim()

    // DATA = value of, or data relating to the mnemonic. This value or input can be of any length
    // and can contain spaces, dots or colons as appropriate. It must be preceded by at least one
    // space to demarcate it from the units and must be to the left of the last colon in the line.
    x = line.indexOf(' ')
    if (x < 0) {
      //no space between data and full colon? (data: desc)
      if (line.endsWith(':')) {
        x = line.indexOf(':')


      }
      //no data or space ( : desc)
      else if (line.startsWith(':')) {
        t = ''//no data
        x = 0

      }
      else
        return ''
    }
    else { //if no space between data and colon, value will end with colon

      t = line.slice(0, x)
      if (t.endsWith(':')) {
        x -= 1
        t = line.slice(0, x)
      }
      t = t.trim()
    }
    if (checkWrap) {
      if (t.search(/yes/i) >= 0) {
        alert('File is WRAPPED, cannot process. Use unwrapped LAS files.')
        return
      }
    }
    if (bHasUnits)
      r += qt + unit + qt + t + qt + comma;
    else
      r += qt + unit + qt + qt + comma;

    line = line.slice(x)
    line = line.trim()

    x = line.indexOf(':')
    if (x < 0)
      return ''
    let u = t
    t = line.slice(0, x)
    t.trim()
    if (bHasUnits)//get the data now
      u = t
    if (isNull)
      // this.state.nullValue = parseFloat(u)
      nullValue = parseFloat(u)

    r += qt + data + qt + u + qt + comma
    line = line.slice(x + 1)
    line = line.trim()
    r += qt + desc + qt + line + qt + '}'
    dispatch(fileStateFirst(false))
    //console.log(r)
    return r
  }
}
export const processLineNoFormat = (line, dispatch, getState) => {
  if (line.startsWith('#'))//comment, skip
    return ''
  let qt = '"'
  let unit = 'UNIT": '
  let data = 'DATA": '
  let desc = 'DESC": '
  let comma = ', '
  let rtn = ''
  let nullValue = -999.25
  
  line = line.trim()
  //replace tabs with spaces
  line = line.replace(/\t+/g, ' ')
  if (line.indexOf('~') >= 0) {
    line = getSections(line, dispatch);
    //remove tiddle, replace with underscore
    line = line.replace('~', '_')
    //replace whitespace with underscore
    line = line.replace(' ', '_')
    //tab = '\t'
    dispatch(fileStateFirst(true))
    if (getCurrentHeadings(getState) > 0) {//finish off last heading
      //console.log('heading > 0')
      rtn = '},'
      rtn +=  '"' + line + '": {'
    }
    else {
      //console.log('heading <= 0')
      rtn = qt + line + '": {'
    }
    dispatch(addHeading())
    return rtn;
  }
  else if (IsAscii(getState)) {
    line = line.replace(/\s+/g, ',')//replace whitespaces with comma
    line = line.replace('\t', ',')
    line = line.replace(',,', ',' + nullValue + ', ');
    dispatch(incrementData())
    let ch = "DATA" + (getCurrentDataCount(getState) + 1) + '":'
    rtn = qt + ch + '[' + line + ']'
    if (!IsFirst(getState)) {
      //not the first set of params for this heading, add the end of last line
      rtn = ',' + rtn;
    }
    dispatch(fileStateFirst(false))
    return rtn;
  }
  else { //not a heading
    //not a heading, parse "name": value
    let t, r;
    let checkWrap = false
    let isNull = false
    let bHasUnits = line.indexOf('. ') < 0
    let x = line.indexOf('.')
    if (x < 0)
      return ''
    t = line.slice(0, x)
    t.trim()
    // check mnem for the null value
    if (t.search(/null/i) >= 0)
      isNull = true

    if (t.search(/WRAP/) >= 0)
      checkWrap = true

    r = qt + t + qt + ': {'
    if (!IsFirst(getState)) {
      //not the first set of params for this heading, add the end of last line
      r = ',' + r
    }
    line = line.slice(x + 1)
    line = line.trim()

    // DATA = value of, or data relating to the mnemonic. This value or input can be of any length
    // and can contain spaces, dots or colons as appropriate. It must be preceded by at least one
    // space to demarcate it from the units and must be to the left of the last colon in the line.
    x = line.indexOf(' ')
    if (x < 0) {
      //no space between data and full colon? (data: desc)
      if (line.endsWith(':')) {
        x = line.indexOf(':')
      }
      //no data or space ( : desc)
      else if (line.startsWith(':')) {
        t = ''//no data
        x = 0
      }
      else
        return ''
    }
    else { //if no space between data and colon, value will end with colon

      t = line.slice(0, x)
      if (t.endsWith(':')) {
        x -= 1
        t = line.slice(0, x)
      }
      t = t.trim()
    }
    if (checkWrap) {
      if (t.search(/yes/i) >= 0) {
        alert('File is WRAPPED, cannot process. Use unwrapped LAS files.')
        return
      }
    }
    if (bHasUnits)
      r += qt + unit + qt + t + qt + comma;
    else
      r += qt + unit + qt + qt + comma;
    line = line.slice(x)
    line = line.trim()
    x = line.indexOf(':')
    if (x < 0)
      return ''
    let u = t
    t = line.slice(0, x)
    t.trim()
    if (bHasUnits)//get the data now
      u = t
    if (isNull)
      // this.state.nullValue = parseFloat(u)
      nullValue = parseFloat(u)

    r += qt + data + qt + u + qt + comma
    line = line.slice(x + 1)
    line = line.trim()
    r += qt + desc + qt + line + qt + '}'
    dispatch(fileStateFirst(false))
    //console.log(r)
    return r
  }
}

const getSections = (line, dispatch) => {
  if (line.search(/~a\w?/i) >= 0) {
    dispatch(fileStateAscii(true));
    line = '~ASCII';
  }
  if (line.search(/~V\w?/i) >= 0) {
    line = '~VERSION_INFORMATION';
  }
  if (line.search(/~W\w?/i) >= 0) {
    line = '~WELL_INFORMATION';
  }
  if (line.search(/~C\w?/i) >= 0) {
    line = '~CURVE_INFORMATION';
  }
  return line;
}
export default getLine
