import React from 'react'
import PropTypes from 'prop-types'
import '../styles/Section.css';

const Section = ({ section, heading }) => {
  let keys = Object.keys(section)
  let items = []
  keys.forEach((key, i) =>{
    items.push(`${key}` + ": " +  JSON.stringify(section[key]).replace(/\\r|{|}|\"/g, '') )
  })
  let data = items.map( item =>{
    return (<li>{item}</li>)
  })
  return (
    <div id='sec_div'>
      <h2 id='sec_head' >{heading}</h2>
      <ul>{data}</ul>
    </div>
  )
}
Section.propTypes = {
  section: PropTypes.object.isRequired
}
export default Section
