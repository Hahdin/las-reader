import { combineReducers } from 'redux'
import files from './files'
import lasFile from './lasfile'
const wellApp = combineReducers({
  files,
  lasFile,
})

export default wellApp
