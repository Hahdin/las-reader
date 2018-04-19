import React from 'react'
import PropTypes from 'prop-types'
import '../styles/App.css'

const InputFile = ({ filter, onChange }) => {
  let style = { float: 'left' }
  return (
    <div>
      <input id='file-input' type='file' name='name' encType='multipart/form-data' accept={filter} style={style}
        onChange={e => {
          onChange(e)
        }}
      />
    </div>
  )
}

InputFile.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default InputFile










