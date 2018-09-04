import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';
import store from './store';
import FrontPage from './components/page_index';
import InsurancePage from './components/page_insurances';
import MyInsurances from './components/page_myinsurances';
import InsuranceClaim from './components/page_insuranceclaim';
import CountInsurances from './components/page_countinsurances';
import Chat from './components/chat';
import Navigation from './components/page_navigation';
import Register from './components/auth/register';
import Login from './components/auth/login';
import {InsuranceForm} from "./components/page_buy_insurances";
import LogOutTimer from "./components/LogOutTimer";

// Check for auth token
if (localStorage.jwtToken) {



    // Set auth token header
    setAuthToken(localStorage.jwtToken);

    // Decode auth token and get user info
    const decoded = jwt_decode(localStorage.jwtToken);

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    var chatBot = <Chat/>
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {chatBot}
                <LogOutTimer/>
                <Navigation/>
                <Switch>
                    <Route path="/haevakuutusta" component={InsuranceForm}/>
                    <Route path="/kirjaudu" component={Login}/>
                    <Route path="/rekisteroidy" component={Register}/>
                    <Route path="/laskevakuutus" component={CountInsurances}/>
                    <Route path="/omavakuutus" component={MyInsurances}/>
                    <Route path="/vakuutukset" component={InsurancePage}/>
                    <Route path="/vahinkoilmoitus" component={InsuranceClaim}/>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/" component={FrontPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container-fluid'));
