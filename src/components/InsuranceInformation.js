import React, {Component} from 'react'
import {Col, Grid, Panel, Row} from 'react-bootstrap';


export default class InsuranceInformation extends Component {
    state = {
        insurancetobedisplayed: []
    };

    render() {
        return (
            <div>
                <Grid fluid>
                    <Row className="show-grid information_box">
                        <Col xs={12} sm={2}></Col>
                        <Col xs={12} sm={8} className="userprofile">
                            <Panel id="collapsible-panel-example-2" defaultExpanded>
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        {this.props.selectedInformation.name}
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        {this.props.selectedInformation.copyBlurb}
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        {this.props.selectedInformation.conditionsUrl}
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        Tutustu ehtoihin!
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>
                        </Col>
                        <Col xs={12} sm={2}></Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}
