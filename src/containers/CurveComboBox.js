import { connect } from 'react-redux'
import ComboBox from '../components/Combo'
import { chartCurve } from '../actions/las'
const mapStateToProps = (state, ownProps) => {
  return ({ 
    items: state.lasFile.CURVE_INFORMATION ||  {},
   })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (e) => {
    dispatch(chartCurve(e.target.value))
  }
})

const CurveComboBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComboBox)

export default CurveComboBox 
