import { connect } from 'react-redux'
import InfoDiv from '../components/InfoDiv'
import '../styles/InfoDivLas.css'

const mapStateToProps = (state, ownProps) => {
  return ({
    info: state.files || ''
  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  
})

const LasInfoDiv = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoDiv)

export default LasInfoDiv
