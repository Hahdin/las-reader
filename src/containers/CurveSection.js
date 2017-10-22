import { connect } from 'react-redux'
import Section from '../components/Section'

const mapStateToProps = (state, ownProps) => {
  return ({
      section: state.lasFile.CURVE_INFORMATION ||  {},
      heading: 'Curve Information',
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({ 
  
})

const CurveSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(Section)

export default CurveSection
