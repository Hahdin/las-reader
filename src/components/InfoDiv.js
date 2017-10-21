import React from 'react'
import PropTypes from 'prop-types'
//import '../styles/InfoDivLas.css'

const InfoDiv = ({ info}) => {
  console.log(info)
  if(!info.name)
    return <div></div>
  let items = []
  let keys = Object.keys(info[info.name])

  keys.forEach((key) =>{
    if(key !== 'raw')
      items.push(<div><p>{key}: {JSON.stringify(info[info.name][key])}</p></div>)
  })
  return (
    <div id='info_div'>
        <hr/>{items}<hr/>
        
    </div>
  )
}

InfoDiv.propTypes = {
  name: PropTypes.string.isRequired
}
export default InfoDiv
