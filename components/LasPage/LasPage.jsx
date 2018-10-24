import React from 'react';
import { connect } from 'react-redux';
import { LasInputFile } from '../LasInputFile'
import { Chart } from '../Chart'
import { Section } from '../Section'
import {
  Grid,
  Col,
  Row,
  Tabs,
  Tab,
} from "react-bootstrap";

const LasPage = ({ ...props }) => {
  return (
    <div>
      <LasInputFile />
      <Grid fluid>
        <Row>
          <Col xs={2} md={4}>
            <div style={{ backgroundColor: 'white' }}>
              <Tabs defaultActiveKey={1}>
              <Tab eventKey={1}  title={'Well'}>
                  <Section
                    section={props.files.WELL}
                    heading={'Well'}
                  />
                </Tab>
                {/* <Tab eventKey={2}  title={'Version'}>
                  <Section
                    section={props.files.VERSION}
                    heading={'Version'}
                  />
                </Tab> */}
                <Tab eventKey={2}  title={'Curves'}>
                  <Section
                    section={props.files.CURVE_INFORMATION}
                    heading={'Curve Information'}
                  />
                </Tab>
                <Tab eventKey={3} title={'Parameters'}>
                  <Section 
                    section={props.files.PARAMETER_INFORMATION}
                    heading={'Param. Information'}
                  />
                </Tab>
              </Tabs>
            </div>
          </Col>
          <Col xs={2} md={8}>
            <div style={{ backgroundColor: 'white' }}><Chart /></div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

function mapStateToProps(state) {
  return ({
    files: state.files || {},
  })
}

const connected = connect(mapStateToProps)(LasPage);
export { connected as LasPage };