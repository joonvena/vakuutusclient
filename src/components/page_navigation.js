import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions';

class PageNavigation extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push('/kirjaudu');
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const guestLinks = (
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} componentClass={Link} href="/" to="/">
                        Etusivu
                    </NavItem>
                    <NavItem eventKey={2} componentClass={Link} href="/vakuutukset" to="/vakuutukset">
                        Vakuutukset
                    </NavItem>
                    <NavItem eventKey={4} componentClass={Link} href="/" to="/kirjaudu">
                        Kirjaudu sisään
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        );

        const authLinks = (

            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} componentClass={Link} href="/" to="/">
                        Etusivu
                    </NavItem>
                    <NavItem eventKey={2} componentClass={Link} href="/vakuutukset" to="/vakuutukset">
                        Tutustu vakuutuksiin
                    </NavItem>
                    <NavItem eventKey={6} componentClass={Link} href="/" to="/laskevakuutus">
                        Hae vakuutusta
                    </NavItem>
                    <NavItem eventKey={3} componentClass={Link} href="/" to="/omavakuutus">
                        Oma sivu
                    </NavItem>
                    <NavItem eventKey={7} componentClass={Link} href="/" to="/vahinkoilmoitus">
                        Ilmoita vahingosta
                    </NavItem>
                    <NavItem eventKey={4} componentClass={Link} href="#" to="#" onClick={this.onLogoutClick.bind(this)}>
                        Kirjaudu ulos
                    </NavItem>

                </Nav>
            </Navbar.Collapse>

        );

        return (
            <Navbar fluid collapseOnSelect className="nav_custom">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Vakuutusprojekti</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                {isAuthenticated ? authLinks : guestLinks}
            </Navbar>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withRouter(PageNavigation))