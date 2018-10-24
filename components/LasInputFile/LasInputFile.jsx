import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { openFile, parseFile} from '../../actions'
import {Combo} from '../Combo'

const LasInputFile = ({ filter, onChange }) => {
  let style = { float: 'left', backgroundColor: 'lightgrey'  }
  return (
    <div>
      <input id='file-input' type='file' name='name' encType='multipart/form-data' 
        accept={filter} style={style} className='form-control'
        onChange={e => {onChange(e)}}
      />
      {/* <Combo /> */}
    </div>
  )
}
LasInputFile.propTypes = {
  onChange: PropTypes.func.isRequired
}
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
        return
      }
      let slice = file.slice(offset, offset + chunk);
      fr.readAsText(slice);
    }
    const fl = e.target.files
    if (!fl.length) return 
    //read in chunks
    let chunk = 1024 * 100// 100kb
    let offset = 0
    const fr = new FileReader()
    let file = fl[0]
    dispatch(openFile(fl[0], []))
    fr.onload = (event) => {
      parse(dispatch, fr.result)
      .then(pr => {
        offset += chunk
        seek()
      })
      .catch(reason =>{
        console.log(reason)
      })
    }
    seek()
  }
})
const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(LasInputFile)
export { connected as LasInputFile };