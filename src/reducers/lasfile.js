
import {
  ADD_SECTION,
  ADD_DATA,
  ADD_ASCII,
  RESET_LAS,
  CURRENT_SECTION,
  CHART_CURVE,
} from '../types/types'
const ASCII = 'ASCII'

const initialState = {
  section: '',
  chartCurve: '',
  chunk: 0,
  [ASCII]:{
    data: []
  }
}

const lasFile = (state = initialState, action) => {
  switch (action.type) {
    case CHART_CURVE:{
      return {
        ...state,
        chartCurve: action.curve
      }
    }
    case CURRENT_SECTION:
      return {
        ...state,
        section: action.section,
        chunk: state.chunk + 1
      }
      case RESET_LAS://reset ascii only
      //console.log('lasFile reset')
      return {
        ...state,
        [ASCII]: {
          data:[]
        },
        ['CURVE_INFORMATION']:{
          
        }
      }
    case ADD_SECTION:
      return {
        ...state,
        [action.section]:{
          ...state[action.section]
        }
      }
    case ADD_DATA:
   // console.log('add data',action.data )
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
    case ADD_ASCII:
    return {
      ...state,
      [ASCII]: {
        data: state[ASCII].data.concat(action.data)
      }
    }
  default:
      return state
  }
}

export default lasFile
