import React, {Component} from 'react';
import {Button, Col, Grid, Image, Row} from 'react-bootstrap';

class IndexPage extends Component {

    render() {
        return (
            <div>
                <Grid fluid className="splash">
                    <Row className="show-grid text-center information">
                        <Col xs={12} sm={12}>
                            <h1>
                                Vakuutusportaali on uudenlainen tapa käsitellä vakuutusasioitasi.
                            </h1>
                            <a href="/laskevakuutus"><Button bsClass="insurance_button">Osta vakuutuksia</Button></a>
                        </Col>
                    </Row>
                </Grid>
                <Grid fluid className="info_cards">
                    <Row className="show-grid cards text-center">
                        <Col xs={12} sm={4}>
                            <Image className="info_image" src="cycling.jpg" responsive/>
                            <h3>"Mahtava palvelu, ystävällinen asiakaspalvelu sekä nopeat käsittelyajat.
                                Suosittelen!"</h3>
                            <h4>- Joonas V.</h4>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Image className="info_image" src="kalle.jpg" responsive/>
                            <h3>"Tapaturman jälkeen vahinkoilmoitus käsiteltiin minuuteissa!"</h3>
                            <h4>- Kalle P.</h4>
                        </Col>
                        <Col xs={12} sm={4}>
                            <Image className="info_image" src="joonas.jpg" responsive/>
                            <h3>"Nopea käsittely ja käyttäjäystävällinen sivusto! Myös nykyaikainen vakuutuslaskuri on
                                kiva."</h3>
                            <h4>- Joonas J.</h4>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}

export default IndexPage