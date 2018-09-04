import React, {Component} from 'react';
import {DropdownButton, Grid, MenuItem, Row} from 'react-bootstrap';
import axios from 'axios';
import InsuranceInformation from './InsuranceInformation';

class InsuranceIndex extends Component {

    state = {
        arrayofInsurance: ["testi"],
        insuranceToBeDisplayed: []
    };

    componentDidMount() {
        axios.get("http://localhost:4000/insurancetypes")
            .then(res => {
                const newArrayofInsurance = res.data;
                this.setState({arrayofInsurance: newArrayofInsurance}, function () {
                });
            })
    }


    onSelect(e) {
        let selectedInsurance;

        for (let i = 0; i < this.state.arrayofInsurance.length; i++) {
            if (this.state.arrayofInsurance[i].name === e) {
                selectedInsurance = this.state.arrayofInsurance[i]
            }
        }
        this.setState({insuranceToBeDisplayed: selectedInsurance}, () => {

        })
    }

    /*
        onSelect() {
            let selectedInsurance = target.get.value;
            selectedInsurance = arrayofInsurance.selectedInsurance;
            this.setState({selectedInsurance})
        }
    */

    render() {
        let insuranceData;
        if (this.state.insuranceToBeDisplayed.length > 0) {
            insuranceData = <InsuranceInformation selectedInformation={this.state.insuranceToBeDisplayed}/>
        } else {
            insuranceData = <p></p>
        }

        return (
            <div>
                <Grid fluid className="splash">
                    <Row className="show-grid text-center information">
                        <h3>Valitse vakuutustyyppi</h3>
                        <DropdownButton
                            title={"Ajoneuvovakuutukset"}
                            key={"ajoneuvot"}
                            className="insurance_selector"
                            id="ajoneuvot"
                        >
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Henkilöauto">Henkilöauto</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Pakettiauto">Pakettiauto</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)}
                                      eventKey="Moottoripyörä">Moottoripyörä</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Mopo">Mopo</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)}
                                      eventKey="Matkailuauto">Matkailuauto</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)}
                                      eventKey="Matkailuvaunu">Matkailuvaunu</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)}
                                      eventKey="Moottorikelkka">Moottorikelkka</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Mönkijä">Mönkijä</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Perävaunu">Perävaunu</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Vene">Vene</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Traktori">Traktori</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Kuorma-auto">Kuorma-auto</MenuItem>
                        </DropdownButton>

                        <DropdownButton
                            title="Koti & omaisuus"
                            key={"koti"}
                            className="insurance_selector"
                            id="koti"
                        >
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Kerrostalo">Kerrostalo</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Rivitalo">Rivitalo</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Omakotitalo">Omakotitalo</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Paritalo">Paritalo</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Erillistalo">Erillistalo</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Mökki">Mökki</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)}
                                      eventKey="Sijoitusasunto">Sijoitusasunto</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Metsä">Metsä</MenuItem>
                        </DropdownButton>

                        <DropdownButton
                            title="Matka"
                            key={"matka"}
                            className="insurance_selector"
                            id={"matka"}
                        >
                            <MenuItem onSelect={this.onSelect.bind(this)}
                                      eventKey="Matkavakuutus">Matkavakuutus</MenuItem>
                        </DropdownButton>


                        <DropdownButton
                            title="Henkilöt"
                            key={"henkilot"}
                            className="insurance_selector"
                            id={"henkilot"}
                        >
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Vauva">Vauva(raskaus)</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Lapsi">Lapsi(7 vrk - 14
                                v)</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Aikuinen">Aikuinen</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)}
                                      eventKey="Henkivakuutus">Henkivakuutus</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)}
                                      eventKey="Urheiluvakuutus">Urheiluvakuutus</MenuItem>
                        </DropdownButton>

                        <DropdownButton
                            title="Eläimet"
                            key={"elaimet"}
                            className="insurance_selector"
                            id={"elaimet"}
                        >
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Koira">Koira</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Kissa">Kissa</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Hevonen">Hevonen</MenuItem>
                            <MenuItem onSelect={this.onSelect.bind(this)} eventKey="Dinosaurus">Dinosaurus</MenuItem>
                        </DropdownButton>

                    </Row>
                </Grid>
                <Grid fluid className="info_cards">
                    <Row className="show-grid cards text-center">
                        {insuranceData}
                    </Row>
                </Grid>
            </div>
        );
    }

}

export default InsuranceIndex