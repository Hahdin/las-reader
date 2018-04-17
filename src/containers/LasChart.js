import { connect } from 'react-redux'
import Chart from '../components/Chart'

const mapStateToProps = (state, ownProps) => {
  return ({
    title: state.files.name || '',
    info: {
      file: state.lasFile,
      readingFile: state.files.reading || false
    }
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('chart container', ownProps)
  return ({
      test: () =>{
      }
  })
}

const LasChart = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)

export default LasChart