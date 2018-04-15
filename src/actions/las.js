import types from '../types/types'

export const chartCurve = (curve) =>{
  return ({
    type: types.CHART_CURVE,
    curve: curve
  })
}
export const addSection = (section) => {
  return ({
    type: types.ADD_SECTION,
    section: section,
  })
}

export const currentSection = (section) =>{
  return ({
    type: types.CURRENT_SECTION,
    section: section
  })
}
export const reset = () =>{
  return ({
    type: types.RESET_LAS,
  })
}
export const addData = (section, data) =>{
  return ({
    type: types.ADD_DATA,
    section: section,
    data: data,
  })
}
export const addAscii = ( data) =>{
  //console.log('add ascii', data)
  return ({
    type: types.ADD_ASCII,
    data: data,
  })
}

//track reading the file (not really needed I discover)
export const readingVers = (bool) =>{
  return ({
    type: types.READING_VER,
    bool,
  })
}
export const readingWell = (bool) =>{
  return ({
    type: types.READING_WELL,
    bool,
  })
}
export const readingCurve = (bool) =>{
  return ({
    type: types.READING_CURVE,
    bool,
  })
}
export const readingAscii = (bool) =>{
  return ({
    type: types.READING_ASCII,
    bool,
  })
}

export default {
  addSection,
  addData,
  addAscii,
  reset,
  readingVers,
  readingWell,
  readingCurve,
  readingAscii,
  currentSection,
  chartCurve,
}

