import { connect } from 'react-redux'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => {
    console.log('header state, props', state, ownProps)
  return ({name: state.files.name || ''})
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  
})

const LasHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default LasHeader
