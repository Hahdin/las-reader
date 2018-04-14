
import {
  ADD_SECTION,
  ADD_DATA,
  ADD_ASCII,
  RESET_LAS,
  CURRENT_SECTION,
} from '../types/types'
const ASCII = 'ASCII'

const initialState = {
  section: '',
  chunk: 0,
  [ASCII]:{
    data: []
  }
}

const lasFile = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_SECTION:
      return {
        ...state,
        section: action.section,
        chunk: state.chunk + 1
      }
      case RESET_LAS://reset ascii only
      console.log('lasFile reset')
      return {
        ...state,
        [ASCII]: {
          data:[]
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
