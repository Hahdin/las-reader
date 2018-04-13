import { connect } from 'react-redux'
import Section from '../components/Section'

const mapStateToProps = (state, ownProps) => {
  return ({
      section: state.lasFile.WELL ||  {},
      heading: 'Well',
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  
})

const WellSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(Section)

export default WellSection
