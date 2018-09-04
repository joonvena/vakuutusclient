import React, {Component} from 'react';
import {Button, Col, Grid, Row} from 'react-bootstrap';
import axios from 'axios';
import {Calculator} from "./Calculator";

class DragandDrop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            price: 0,
            insurances: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/insurancetypes')
            .then(res => {
                let insurances = res.data;

                for (let i = 0; i < insurances.length; i++) {
                    let insurance = insurances[i];
                    insurance.category = insurances[i].insurancetype;
                    if (!insurance.price) insurance.price = 50;
                }

                this.setState({insurances: insurances});
            });
    }

    onDragOver = (e) => {
        e.preventDefault();
    };

    onDragStart = (e, id) => {
        e.dataTransfer.setData("id", id);
    };

    onDrop = (event, category) => {
        let id = event.dataTransfer.getData("id");
        let filtered = this.state.insurances.filter(task => {
            if (task.name === id) {
                task.category = category;
            }
            return task;
        });

        this.setState({
            ...this.state,
            insurances: filtered,
        });
    };


    render() {

        const history = this.props.history;
        let insObject = {chosenInsurances: []};
        let categories = [];

        this.state.insurances.forEach(insurance => {
            let field = insurance.category;

            if (!(field in insObject)) {
                insObject[field] = [];
                categories.push(field);
            }

            insObject[field].push(
                <div key={insurance._id}
                     onDragStart={(e) => this.onDragStart(e, insurance.name)}
                     draggable
                     className="draggable" style={{backgroundColor: "white"}}
                     about={insurance}>
                    {insurance.name}
                </div>
            );
        });

        let categoriesToPage = categories.map(category => {
            return (
                <Col xs={12} sm={4} key={category}>
                    <div className="insurance_category" onDragOver={(e) => this.onDragOver(e)} onDrop={e => {
                        this.onDrop(e, category)
                    }}>
                        <h3>{category}</h3>
                        {insObject[category]}
                    </div>
                </Col>
            )
        });

        function submitInsurances() {
            let chosenOnes = [];
            insObject.chosenInsurances.forEach(element => {
                let insurance = {
                    id: element.props.about._id,
                    category: element.props.about.insurancetype,
                    name: element.props.about.name,
                    defaultPrice: element.props.about.price
                };
                chosenOnes.push(insurance);
            });
            sessionStorage.setItem("chosenOnes", JSON.stringify(chosenOnes));
            history.push("/haevakuutusta");
        }

        let insButton;
        if (insObject.chosenInsurances.length > 0) {
            insButton = <Button bsClass="insurance_button" onClick={submitInsurances}>Hae näitä vakuutuksia</Button>
        }

        return (
            <div>
                <h1 className="header">Hae vakuutusta</h1>
                <Calculator data={insObject.chosenInsurances}/>
                <Grid fluid className="info_cards">
                    <Row className="show-grid cards text-center">
                        <Col xs={12} sm={4}/>
                        <Col xs={12} sm={4}>
                            <div
                                className="droppable"
                                onDragOver={(e) => this.onDragOver(e)}
                                onDrop={(e) => this.onDrop(e, "chosenInsurances")}
                                id={"insurance-dropbox"}
                            >
                                <h3>Pudota vakuutukset tähän:</h3>
                                {insObject.chosenInsurances}
                                {insButton}
                            </div>
                        </Col>
                        <Col xs={12} sm={4}/>
                        <Grid>
                            {categoriesToPage}
                        </Grid>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default DragandDrop;