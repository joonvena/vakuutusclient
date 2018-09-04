import React, {Component} from 'react'
import {Col, Grid, Row} from 'react-bootstrap';

import ClaimForm from './form_insuranceclaim';


export default class page_addinsurance extends Component {

    render() {
        return (
            <div>
                <Grid fluid className="splash">
                    <Row className="show-grid text-center information">

                        <h3>Sattuiko vahinko? Ei hätää, ilmoita tässä vahingostasi niin käsittelemme hakemuksesi
                            mahdollisimman pian.</h3>

                    </Row>
                </Grid>
                <Grid fluid className="info_cards">
                    <Row className="show-grid cards text-center">
                        <Col xs={12} sm={2}/>
                        <Col xs={12} sm={8} className="userprofile">
                            < ClaimForm/>
                        </Col>
                        <Col xs={12} sm={2}/>
                    </Row>
                </Grid>
            </div>
        )
    }
}
