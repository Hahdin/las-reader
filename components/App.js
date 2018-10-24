import React from 'react'
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history, } from '../helpers';
import { HomePage } from '../components/HomePage';
import { LasPage } from '../components/LasPage';
import { MyNavBar } from '../components/MyNavBar/MyNavBar';
const App = ({ ...props }) => {
  return (
    <div className="container-fluid">
      {/* <div className="col-sm-12"> */}
        <Router history={history}>
          <div>
            <MyNavBar />
            <Route path="/" exact component={HomePage} />
            <Route path="/las" component={LasPage} />
          </div>
        </Router>
      {/* </div> */}
     </div>
  );
}
const mapStateToProps = (state) => {
  return {
  };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
