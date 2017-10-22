import { connect } from 'react-redux'
import InputFile from '../components/InputFile'
import { _openFile, parseFile } from '../actions/files'
const mapStateToProps = (state, ownProps) => {
  return ({filter: '.las'})//files allowed
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (e) => {
    const fl = e.target.files
    if (!fl.length) return
    const reader = new FileReader()
    reader.onload = (event) => {
      //console.log('success')
      dispatch(_openFile(fl[0], event.target.result))
      dispatch(parseFile(event.target.result))
    }
    reader.onprogress = (ev) =>{
      console.log(ev)
    }
    reader.onerror = (error) =>{
      console.log(error)
    }
    reader.onabort = (abort) =>{
      console.log(abort)
    }
    reader.readAsText(fl[0])
  }
})

const LasInputFile = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputFile)

export default LasInputFile 
