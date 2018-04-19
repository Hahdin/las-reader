import React, { Component } from 'react'
import logo from './logo.svg'
import '../styles/App.css'
import LasInputFile from '../containers/LasInputFile'
import LasHeader from '../containers/LasHeader'
import VersionSection from '../containers/VersionSection'
import WellSection from '../containers/WellSection'
import CurveSection from '../containers/CurveSection'
import LasInfoDiv from '../containers/LasInfoDiv'
import LasChart  from '../containers/LasChart'
import CurveComboBox from '../containers/CurveComboBox'
import ScaleCheckbox from '../containers/ScaleCheckbox'
class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <LasInputFile />
        <ScaleCheckbox />
        <br />
        <CurveComboBox />
        <LasHeader />
        <LasChart /> 
        <LasInfoDiv />
        <VersionSection />
        <WellSection />
        <CurveSection /> 
        </div>
    )
  }
}

export default App 

