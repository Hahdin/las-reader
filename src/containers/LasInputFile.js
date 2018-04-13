import { connect } from 'react-redux'
import InputFile from '../components/InputFile'
import { _openFile, parseFile, readingFile } from '../actions/files'
const mapStateToProps = (state, ownProps) => {
  return ({ filter: '.las' })//files allowed
}

const parse = (dispatch, data) =>{
  return new Promise ((resolve, reject) =>{
    dispatch(parseFile(data))
    resolve(true)
  })
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (e) => {
    const seek = () => {
      if (offset >= file.size) {
        //console.log('offset larger than file')
        dispatch(readingFile(false))
        return
      }
      //console.log('processing ' + offset + ' of ' + file.size)
      let slice = file.slice(offset, offset + chunk);
      fr.readAsText(slice);
    }

    let el = document.getElementById('file-input')
    const fl = e.target.files
    if (!fl.length) return

    //read in chunks
    let chunk = 1024 * 100// 100kb
    let offset = 0
    const fr = new FileReader()
    let file = fl[0]
    dispatch(readingFile(true))
    dispatch(_openFile(fl[0], []))
    fr.onload = (event) => {
      parse(dispatch, fr.result)
      .then(pr => {
        //console.log('finish parse')
        offset += chunk
        seek()
      })
      .catch(reason =>{
        dispatch(readingFile(false))
        console.log(reason)
      })
    }
    seek()
  }
})

const LasInputFile = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputFile)

export default LasInputFile 
