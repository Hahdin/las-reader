import React from 'react'
import PropTypes from 'prop-types'
import '../styles/Section.css';

const Section = ({ section, heading}) => {
  let keys = Object.keys(section)
  let items = []
  keys.forEach((key, i) =>{
    let things = Object.keys(section[key])
    let entry = ''
    things.forEach(thing =>{
      if (!key)
        return
      entry += ' ' +JSON.stringify(section[key][thing]).replace(/\\r|{|}|\"/g, '')
    })
    items.push(entry)
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
