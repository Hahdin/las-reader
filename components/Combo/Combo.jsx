import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { chartCurve } from '../../actions'

class Combo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: []
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(e){
    this.setState({value: e.target.value})
    this.props.onChange(e)


  }
  render() {
    let style = {
      // backgroundColor: 'black',
      // color: 'white',
      float: 'left'
    }
    let options = []
    let keys = Object.keys(this.props.items)
    keys.forEach(curve => {
      options.push((<option id={curve} >{curve}</option>))
    })
    if (keys.length === 0)
      style.display = 'none'
    return (
      <div >
        <br />
        <select style={style} className='dropbtn'
          onChange={this.onChange}
        >
          {options}
        </select>
      </div>
    )
  }
}

Combo.propTypes = {
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return ({ 
    items: state.files.CURVE_INFORMATION ||  {},
   })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (e) => {
    dispatch(chartCurve(e.target.value))
  }
})
const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Combo)

export { connected as Combo };