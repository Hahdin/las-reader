import { connect } from 'react-redux'
import DisplayFile from '../components/DisplayFile'
import { _showFile } from '../actions'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state, ownProps) => {
  console.log('Display mapStateToProps',state, ownProps)
  let keys = Object.keys(state.files)
  let file = ''
  keys.forEach(key =>{
    console.log(key)
    console.log(state.files[key])
    if (key === state.files[key].name)
      file = state.files[key].raw
  })
  return ({
    file: file
  }) 
}

const mapDispatchToProps = (dispatch, ownProps) =>{
  dispatch(_showFile(true))
}

const DisplayLasFile = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayFile)

export default DisplayLasFile 
