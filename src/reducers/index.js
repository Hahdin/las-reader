import { combineReducers } from 'redux'
import files from './files'
import lasFile from './lasfile'
import chartSettings from './chart'
const wellApp = combineReducers({
  files,
  lasFile,
  chartSettings,
})

export default wellApp
