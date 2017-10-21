import React from 'react'
import PropTypes from 'prop-types'
import '../styles/common.css'

const Header = ({ name}) => {
  return (
    <div>
      <h1 id='h1'>{name}</h1>
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired
}
export default Header
