import { connect } from 'react-redux'
import Section from '../components/Section'

const mapStateToProps = (state, ownProps) => {
  return ({
      section: state.lasFile.VERSION ||  {},
      heading: 'Version',
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  
})

const VersionSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(Section)

export default VersionSection
