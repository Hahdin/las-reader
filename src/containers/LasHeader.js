import { connect } from 'react-redux'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => {
  return ({
    name: state.files.name || '',
    info: {
      reading: state.files.reading,
      file: state.lasFile
    }

  })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  
})

const LasHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default LasHeader
