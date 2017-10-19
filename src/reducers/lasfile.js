

import {
  ADD_SECTION,
} from '../types/types'

const lasFile = (state = [], action) => {
  switch (action.type) {
    case ADD_SECTION:
      return {
        ...state,
        [action.section]:{
          vers: action.vers,
          wrap: action.wrap
        }
      }
    default:
      return state
  }
}

export default lasFile
