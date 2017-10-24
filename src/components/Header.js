import React from 'react'
import PropTypes from 'prop-types'
import '../styles/common.css'

const Header = ({ name, info}) => {
  let title = ''
  let reading = info.reading
  if (info.reading){
    title = 'Reading File, please wait...'
  }
  return (
    <div>
      <h1 id='h1'>{name}</h1>
      <h2 id='h1'>{title}</h2>
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired
}
export default Header
