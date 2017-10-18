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

const getFile = (keys, state) => {
  let file = ''
  keys.forEach(key => {
    if (key === state.files[key].name)
      file = state.files[key].raw
  })
  return file
}

const mapDispatchToProps = (dispatch, ownProps) => {
}

const DisplayLasFile = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayFile)

export default DisplayLasFile


