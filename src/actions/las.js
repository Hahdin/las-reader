import types from '../types/types'

export const addSection = (section) => {
  return ({
    type: types.ADD_SECTION,
    section: section,
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
export const addAscii = (lineNo, data) =>{
  return ({
    type: types.ADD_ASCII,
    data: data,
    lineNo: lineNo
  })
}

export default {
  addSection,
  addData,
  addAscii,
  reset,
}

