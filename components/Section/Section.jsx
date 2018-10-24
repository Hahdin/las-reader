import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { chartCurve } from '../../actions'
const Section = ({ ...props }) => {
  let { section, heading, onClickItem } = props
  return (
    <div >
      <ListGroup>
        {
          Object.values(section).map(value => {
            let data = (value.data.length === 0) ? value.mnem : value.data
            data += (value.unit.length > 0) ? ` ( ${value.unit} )` : ''
            return (
              <div style={{ fontSize: '12px' }}>
                {
                  (heading === 'Curve Information') ?
                    <ListGroupItem onClick={(e) => onClickItem(e)} val={value.mnem} section={heading}>
                      {`${value.desc}: ${data}`}
                    </ListGroupItem>
                    : <ListGroupItem section={heading}>
                      {`${value.desc}: ${data}`}
                    </ListGroupItem>
                }
              </div>
            )
          })
        }
      </ListGroup>
    </div>
  )
}
Section.propTypes = {
  section: PropTypes.object.isRequired,
  onClickItem: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return ({
    section: ownProps.section || {},
    heading: ownProps.heading,
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickItem: (e) => {
    let values = Object.values(e.target.attributes)
    let ret = false
    values.forEach(v => {
      if (v.name === 'section' && v.nodeValue !== 'Curve Information')
        ret = true
    })
    if (ret)
      return
    let val = Object.values(e.target.attributes).filter(a => a.name === 'val')
    if (val.length === 0)
      return
    dispatch(chartCurve(val[0].nodeValue))
  }
})
const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Section)

export { connected as Section };