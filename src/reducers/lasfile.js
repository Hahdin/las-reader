
import {
  ADD_SECTION,
  ADD_DATA,
  ADD_ASCII,
  RESET_LAS,
} from '../types/types'
const ASCII = 'ASCII'

const initialState = {
  [ASCII]:{
    data: []
  }
}

const lasFile = (state = initialState, action) => {
  switch (action.type) {
    case RESET_LAS:
      return []
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
    //console.log('reducer: add ascii', action, state)
    return {
      ...state,
      [ASCII]: {
        //data: state[ASCII].data.concat(action.data)
        data: action.data
      }
      
      
    }
  default:
      return state
  }
}

export default lasFile
