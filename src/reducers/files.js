import {
  OPEN_FILE,
  ADD_HEADING,
  READING_FILE,
} from '../types/types'

const FILE_STATE = 'FILE_STATE'

const files = (state = [], action) => {
  switch (action.type) {
    case READING_FILE:
      return {
        ...state,
        reading: action.bool
      }
    case OPEN_FILE:
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
    case ADD_HEADING:
      return {
        ...state,
        [FILE_STATE]: {
          ...state[FILE_STATE],
          headings: state[FILE_STATE].headings + 1,
        }
      }
    default:
      return state
  }
}

export default files
