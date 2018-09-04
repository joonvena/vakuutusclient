import React from "react";
import axios from "axios";
import {Button, Col, Grid, Panel, Row} from 'react-bootstrap';

export class InsuranceForm extends React.Component {

    constructor(props) {
        super(props);

        let insurances = sessionStorage.getItem("chosenOnes");
        insurances = JSON.parse(insurances);

        let insurancesGrouped = {};
        let categories = [];

        insurances.forEach(insurance => {
            let category = insurance.category;
            if (!insurancesGrouped[category]) {
                insurancesGrouped[category] = [];
            }

            if (!categories[category]) {
                categories.push(category);
            }

            insurancesGrouped[category].push(insurance);
        });

        this.state = {
            insurancesGroupedByCategory: insurancesGrouped,
            profile: {},
            insurances: insurances
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4000/profiili/current")
            .then(res => {
                this.setState({profile: res.data});
            })
    }

    onSubmit(e) {
        e.preventDefault();
        this.submitAll();
    }

    submitAll() {
        let insurances = this.state.insurances;
        let userid = this.state.profile._id;

        insurances.forEach(insurance => {
            let deductible = document.getElementById("deductible-" + insurance.id).value;
            let info = document.getElementById("info-" + insurance.id).value;

            const application = {
                userid: userid,
                insurancetype: insurance.name,
                deductible: deductible,
                additionalinfo: info
            };

            axios.post('http://localhost:4000/application/create', application)
                .then(res => {
                        res.status(201).send();
                    }
                );
        })
    }

    render() {

        let insurances = this.state.insurancesGroupedByCategory;
        let entries = Object.entries(insurances);
        let categoryNodes = entries.map(array => {
            let category = array[0];
            let insurances = array[1];
            let insuranceNodes = insurances.map(insurance => {
                let deductibleID = "deductible-" + insurance.id;
                let infoID = "info-" + insurance.id;

                return (
                    <div key={insurance.id}>
                        <p><b>{insurance.name}</b></p>
                        <p>
                            Haluttu omavastuu:
                            <select name="omavastuu" id={deductibleID}>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={150}>150</option>
                                <option value={200}>200</option>
                                <option value={250}>250</option>
                            </select>
                        </p>
                        <p>
                            Lisätietoja:
                            <input type="text" id={infoID}/>
                        </p>
                    </div>
                )
            });

            return (
                <Panel key={category} id="collapsible-panel-example-2" defaultExpanded>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            {category}
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            {insuranceNodes}
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            );
        });

        return (


            <div>
                <Grid fluid className={"splash"}>
                    <Row  className={"show-grid information"}>
                        <h1 id={"buy_insurances"}>Viimeistele vakuutushakemus</h1>
                        <Col xs={12} sm={2}/>
                        <Col xs={12} sm={8} className="userprofile">
                            {categoryNodes}
                            <div id={"buy_insurances_container"}>
                                <Button bsClass="insurance_button" onClick={this.onSubmit.bind(this)}>Lähetä</Button>
                            </div>
                        </Col>
                        <Col xs={12} sm={2}/>

                    </Row>
                </Grid>

            </div>

        )
    }
}