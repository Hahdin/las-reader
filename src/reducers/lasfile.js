

import {
  ADD_SECTION,
  ADD_DATA,
  ADD_ASCII,
  RESET_LAS,
} from '../types/types'

const lasFile = (state = [], action) => {
  console.log('lasFile', state, action)
  switch (action.type) {
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
      ['ASCII']:{
        ...state['ASCII'],
        [action.lineNo]: action.data
      }
    }
  default:
      return state
  }
}

export default lasFile
