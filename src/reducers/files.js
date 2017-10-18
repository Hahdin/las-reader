import {OPEN_FILE} from '../actions'

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
    default:
        return state
    }
  }
  
  export default files
  