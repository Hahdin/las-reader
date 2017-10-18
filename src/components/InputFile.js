import React from 'react'
import PropTypes from 'prop-types'

const InputFile = ({ filter, onChange }) => {
  return (
    // eslint-disable-next-line
    <div>
      <input id='file-input' type='file' name='name' encType='multipart/form-data' accept={filter}
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










