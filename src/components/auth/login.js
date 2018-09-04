import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('dashboard');
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    }

    render() {
        return (
            <div>
                <Grid fluid className="splash">
                    <Row className="show-grid information">
                        <Col xs={12} sm={2}/>
                        <Col xs={12} sm={8} className="userprofile text-center">
                            <h4>Kirjaudu sisään</h4>
                            <Form onSubmit={this.onSubmit} horizontal>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={1}>

                                    </Col>
                                    <Col sm={10}>
                                        <FormControl value={this.state.email} onChange={this.onChange} type="email"
                                                     name="email" placeholder="Sähköposti"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={1}>

                                    </Col>
                                    <Col sm={10}>
                                        <FormControl value={this.state.password} onChange={this.onChange}
                                                     type="password" name="password" placeholder="Salasana"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col>
                                        <Button type="submit" bsStyle="btn btn-danger">Kirjaudu</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col xs={12} sm={2}/>
                    </Row>
                </Grid>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);