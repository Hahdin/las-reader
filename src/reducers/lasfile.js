
import {
  ADD_SECTION,
  ADD_DATA,
  ADD_ASCII,
  RESET_LAS,
  READING_VER,
  READING_WELL,
  READING_CURVE,
  READING_ASCII,
} from '../types/types'
const ASCII = 'ASCII'

const initialState = {
  READING_WELL: false
}

const lasFile = (state = [], action) => {
  switch (action.type) {
    case READING_VER:
    case READING_WELL:
    case READING_CURVE:
    case READING_ASCII:
      return {
        ...state,
        [action.type]: action.bool
      }
    case RESET_LAS:
      return []
    case ADD_SECTION:
      return {
        ...state,
        [action.section]:{
        }
      }
    case ADD_DATA:
      return {
        ...state,
        [action.section]:{
          ...state[action.section],
          [action.data.mnem]:{
            data: action.data.data,
            desc: action.data.desc
          }
        }
      }
    case ADD_ASCII:
    return {
      ...state,
      [ASCII]:  action.data
      
    }
  default:
      return state
  }
}

export default lasFile
