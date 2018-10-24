import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateScale } from '../../actions'

const CheckBox = ({ value, onClick }) => {
  let style = { float: 'left',  }
  return (
    <div style={style}>
      <label style={style}><input type='checkbox' name='scaleType' value={value} 
        onClick={e => {
          onClick(e)
        }}
      />{` ${value} `}</label>
    </div>
  )
}
CheckBox.propTypes = {
  onClick: PropTypes.func.isRequired
}
const mapStateToProps = (state, ownProps) => {
  return ({
     value: state.chart.scaleType || 'linear'
  })
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (e) => {
    if (e.target.value === 'linear')
      dispatch(updateScale('logarithmic'))
    else
      dispatch(updateScale('linear'))
  }
})
const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckBox)

export { connected as CheckBox };