import { connect } from 'react-redux'
import Checkbox from '../components/Checkbox'
import { updateScale } from '../actions/chart'
const mapStateToProps = (state, ownProps) => {
  return ({
     value: state.chartSettings.scaleType || 'linear'
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (e) => {
    if (e.target.value === 'linear')
      dispatch(updateScale('logarithmic'))
    else
      dispatch(updateScale('linear'))
  }
})

const ScaleCheckbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkbox)

export default ScaleCheckbox 