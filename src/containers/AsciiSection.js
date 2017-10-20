import { connect } from 'react-redux'
import Section from '../components/Section'

const mapStateToProps = (state, ownProps) => {
  return ({
      section: state.lasFile.ASCII || '',
      heading: 'Data',
    })
}

const mapDispatchToProps = (dispatch, ownProps) => ({ 
  
})

const AsciiSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(Section)

export default AsciiSection
