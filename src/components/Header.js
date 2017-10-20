import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired
}
export default Header
