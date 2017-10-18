import React from 'react'
import PropTypes from 'prop-types'

const InputFile = ({ name, onChange }) => {
    console.log('name', name)
    return (
        // eslint-disable-next-line
        <div>
        <input id='file-input' type='file' name='name' encType='multipart/form-data' accept='.txt, .doc, .las, .csv' 
            onChange={e => {
                onChange(e)
            }}
        />
        {name}
        </div>
    )
}

InputFile.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default InputFile










