import { connect } from 'react-redux'
import InputFile from '../components/InputFile'
import { _openFile, parseFile } from '../actions/files'

const mapStateToProps = (state, ownProps) => {
  return ({filter: '.las'})//files allowed
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (e) => {
    const fl = e.target.files
    const reader = new FileReader()
    reader.onload = (event) => {
      dispatch(_openFile(fl[0], event.target.result))
      dispatch(parseFile(event.target.result))
    }
    reader.readAsText(fl[0])
  }
})

const LasInputFile = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputFile)

export default LasInputFile
