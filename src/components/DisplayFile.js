import React from 'react'
import PropTypes from 'prop-types'
import '../styles/DisplayFile.css';

const DisplayFile = ({ file }) => {
  return (
    <div id= 'file'>
      <hr/>
      <pre>{file}</pre>
      <hr/>
    </div>
  )
}

DisplayFile.propTypes = {
  file: PropTypes.string.isRequired
}
export default DisplayFile


