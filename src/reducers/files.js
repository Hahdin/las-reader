import { OPEN_FILE } from '../actions'
import { SHOW_FILE } from '../actions'

const files = (state = [], action) => {
  console.log('files -reducer', state, action)
  switch (action.type) {
    case OPEN_FILE:
      console.log('OPEN_FILE', action.file)
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
    case SHOW_FILE:
    console.log('SHOW_FILE', action)
    return {
      ...state,
      show: action.show
    }
    default:
      return state
  }
}

export default files
