import { connect } from 'react-redux'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => {
  return ({
    name: state.files.name || '',
    info: state.files.reading
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  
})

const LasHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default LasHeader
