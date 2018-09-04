import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    }


    render() {
        return (
            <div>

                <Form onSubmit={this.onSubmit} horizontal>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                value={this.state.name}
                                onChange={this.onChange}
                                type="text"
                                name="name"
                                placeholder="Name"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                value={this.state.email}
                                onChange={this.onChange}
                                type="email"
                                name="email"
                                placeholder="Email"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                value={this.state.password}
                                onChange={this.onChange}
                                type="password"
                                name="password"
                                placeholder="Password"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword2">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                value={this.state.password2}
                                onChange={this.onChange}
                                type="password"
                                name="password2"
                                placeholder="Password again"/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Rekisteröidy</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));