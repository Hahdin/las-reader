import React from 'react'
import PropTypes from 'prop-types'
import '../styles/App.css'

const Checkbox = ({ value, onClick }) => {
  let style = { float: 'left' }

  return (
    <div style={style}>
      <input type='checkbox' name='scaleType' value={value} style={style}
        onClick={e => {
          onClick(e)
        }}
      />{value}
    </div>
  )
}

Checkbox.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Checkbox
