import { connect } from 'react-redux'
import DisplayFile from '../components/DisplayFile'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state, ownProps) => {
  let keys = Object.keys(state.files)
  let file = getFile(keys, state)
  return ({
    file: file
  })
}

//  the store holds all files opened during a session, the 'name' field is updated
//  so will always hold the name of the currently open file. This will use the name
//  to find the file in the store and return the raw data of the file
const getFile = (keys, state) => {
  let file = ''
  keys.forEach(key => {
    if (key === state.files[key].name)
      file = state.files[key].raw
  })
  return file
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const DisplayLasFile = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayFile)

export default DisplayLasFile


