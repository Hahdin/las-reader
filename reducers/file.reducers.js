import { fileConstants } from '../constants';
const ASCII = 'ASCII'
const initialState = {
  section: '',
  chartCurve: '',
  chunk: 0,
  [ASCII]:{
    data: []
  }
}

export const files = (state = initialState, action) => {
  switch (action.type) {
    case fileConstants.OPEN_FILE:
      return {
        ...state,
        name: action.file.name,
        [action.file.name]: {
          name: action.file.name,
          size: action.file.size,
          lastModified: action.file.lastModified,
          lastModifiedDate: action.file.lastModifiedDate,
          type: action.file.type,
          raw: action.raw
        }
      }
      case fileConstants.ADD_SECTION:
      return {
        ...state,
        [action.section]:{
          ...state[action.section]
        }
      }
    case fileConstants.ADD_DATA:
      return {
        ...state,
        [action.section]:{
          ...state[action.section],
          [action.data.mnem]:{
            mnem: action.data.mnem,
            unit: action.data.unit,
            data: action.data.data,
            desc: action.data.desc
          }
        }
      }
    case fileConstants.ADD_ASCII:
    return {
      ...state,
      [ASCII]: {
        data: state[ASCII].data.concat(action.data)
      }
    }
    case fileConstants.RESET_LAS://reset ascii only
    return {
      ...state,
      [ASCII]: { data:[]},
      ['CURVE_INFORMATION']:{}
    }
    case fileConstants.CURRENT_SECTION:
    return {
      ...state,
      section: action.section,
      chunk: state.chunk + 1
    }
    case fileConstants.CHART_CURVE:{
      return {
        ...state,
        chartCurve: action.curve
      }
    }
    default:
      return state
  }
}