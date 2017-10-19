import {
  OPEN_FILE,
  FILE_STATE_ASCII,
  FILE_STATE_FIRST,
  ADD_HEADING,
  RESET_FILESTATE,
  INC_DATA,
  _JSON,
} from '../types/types'

const FILE_STATE = 'FILE_STATE'
const getInit = () => {
  return {
    FILE_STATE: {
      IsAscii: false,
      IsFirst: false,
      headings: 0,
      dataCount: 0,          
}
  }
}
const initialState = getInit()

const files = (state = initialState, action) => {
  switch (action.type) {
    case _JSON:
    return {
      ...state,
      [action.type]:{
        object: action.object
      }

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
      case FILE_STATE_ASCII:
      return {
        ...state,
        [FILE_STATE]: {
          ...state[FILE_STATE],
          IsAscii: action.bool,
        }
      }
      case FILE_STATE_FIRST:
      return {
        ...state,
        [FILE_STATE]: {
          ...state[FILE_STATE],
          IsFirst: action.bool,
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

    case INC_DATA:
      return {
        ...state,
        [FILE_STATE]: {
          ...state[FILE_STATE],
          dataCount: state[FILE_STATE].dataCount + 1,
        }
      }
    case RESET_FILESTATE:
    return {
        ...state,
        [FILE_STATE]: {
          IsAscii: false,
          IsFirst: false,
          headings: 0,
          dataCount: 0,          
        }
      }
    default:
      return state
  }
}

export default files
