import React, {Component} from 'react';
import {Col, Grid, ListGroup, ListGroupItem, Panel, Row} from 'react-bootstrap';
import axios from 'axios';

class MyInsurance extends Component {

    state = {
        profile: {},
        profileclaims: []
    };

    componentWillMount() {
        axios.get("http://localhost:4000/profiili/current")
            .then(res => {
                this.setState({profile: res.data});
            })
    }

    render() {
        let insurances = this.state.profile.profilesinsurances;
        let insuranceNodes = insurances ? insurances.map(ins => {
            return (
                <li key={ins._id}>
                    <p> Vakuutustyyppi: {ins.insurancetype} <br/>
                        Vakuutuksen tunniste: {ins._id} <br/>
                        Lisätiedot: {ins.additionalinfo} <br/>
                        Omavastuu: {ins.deductible} <br/>
                    </p>
                </li>
            )
        }) : [];

        let insuranceClaims = this.state.profile.profileclaims;
        let insuranceClaimNodes = insuranceClaims ? insuranceClaims.map(ins => {
            return (
                <li key={ins._id}>
                    <p> Vakuutustyyppi: {ins.text} <br/>
                        Vakuutuksen tila: {ins.handled} <br/>
                        Vakuutuksen tunniste: {ins._id} <br/>
                        Hakemuspäivä: {ins.date} <br/>
                    </p>
                </li>
            )
        }) : [];

        let invoiceList = this.state.profile.profilesinvoices;
        let invoiceNodes = invoiceList ? invoiceList.map(invoice => {

            return (
                <ListGroup key={invoice._id}>
                    <ListGroupItem><b>Id: </b>{invoice._id}</ListGroupItem>
                    <ListGroupItem><b>Eräpäivä </b>{invoice.duedate}</ListGroupItem>
                    <ListGroupItem><b>Viitenumero: </b><i>{invoice.referenceNumber}</i></ListGroupItem>
                </ListGroup>
            )
        }) : [];

        let profileMessages = this.state.profile.profilemessages;
        let profileMessageNodes = profileMessages ? profileMessages.map(msg => {
            return (
                <li key={msg.messageId}>
                    <p> Viesti: {msg.Message} <br/>
                        Lähettäjä: {msg.Sender} <br/>
                    </p>
                </li>
            )
        }) : [];

        return (
            <div>
                <Grid fluid className="splash">
                    <Row className="show-grid information">
                        <Col xs={12} sm={2}/>
                        <Col xs={12} sm={8} className="userprofile">

                            <Panel id="collapsible-panel-example-2" defaultExpanded>
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Asiakastiedot
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        <p>{this.state.profile.email}</p>
                                        <p>{this.state.profile.name}</p>
                                        <p>{this.state.profile.phone}</p>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Vakuutukset ({insuranceNodes.length})
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        <ol>
                                            {insuranceNodes}
                                        </ol>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Vahinkotapahtumat ({insuranceClaimNodes.length})
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        <ol>
                                            {insuranceClaimNodes}
                                        </ol>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Laskut ({invoiceNodes.length})
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        {invoiceNodes}
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                            <Panel id="collapsible-panel-example-2">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Viestit ({profileMessageNodes.length})
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Collapse>
                                    <Panel.Body>
                                        {profileMessageNodes}
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>

                        </Col>
                        <Col xs={12} sm={2}/>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default MyInsurance