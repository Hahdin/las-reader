import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/Drop.css'

class ComboBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: []
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(e){
    console.log('onchange', e.target.value)
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

ComboBox.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default ComboBox
