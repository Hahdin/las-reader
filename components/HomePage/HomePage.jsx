import React from 'react';
import { connect } from 'react-redux';

const HomePage = ({ ...props }) => {
    return (
      <div>
        <div style={{
          backgroundColor: 'white',
          border: 'thick solid #AAAAFF',
          borderStyle: 'double',
          borderRadius: '25px',
          padding: '10px',
          boxShadow: '2px 2px 10px black'
        }}>Welcome
        </div>
      </div>
    );
}

function mapStateToProps(state) {
  return {
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };