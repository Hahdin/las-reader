import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ name, state }) => {
  let txt =  (state.lasFile.READING_VER || 
    state.lasFile.READING_WELL || 
    state.lasFile.READING_CURVE || 
    state.lasFile.READING_ASCII) ? 'Reading...' : ''
  return (
    <div>
      <h1>{name}</h1>
      <h2>{txt}</h2>
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired
}
export default Header
