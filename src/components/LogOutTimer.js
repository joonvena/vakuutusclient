import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {logoutUser} from '../actions/authActions';
import {connect} from 'react-redux';
import IdleTimer from 'react-idle-timer';

const LOG_OUT_TIME = 1000 * 60 * 2;
const WARN_TIME = 1000 * 30;

class LogOutTimer extends Component {

    constructor(props) {
        super(props);
        this.idleTimer = null;
        this.onIdle = this._onIdle.bind(this);
        this.onActive = this._onActive.bind(this);
        this.state = {
            warning: false,
        }
    }

    _onActive() {
        this.idleTimer.reset();
        if (this.state.warning === true) {
            this.setState({warning: false});
        }
    }

    _onIdle() {
        if (this.idleTimer.getElapsedTime() > LOG_OUT_TIME) {
            this.setState({warning: false});
            this.props.logoutUser();
            this.props.history.push('/kirjaudu');
        }

        else {
            this.setState({warning: true});
        }
    }

    render() {

        let warningMessage;
        if (this.state.warning) warningMessage = <h3 id={"logout-warning"} style={{textAlign: 'center'}}>Olet ollut inaktiivisena {WARN_TIME / 1000} sekuntia.
            Sinut kirjataan turvallisuussyistä automaattisesti ulos, jos et tee mitään {LOG_OUT_TIME / 1000 / 60} minuuttiin.</h3>;

        return (
            <div>
                {warningMessage}
                <IdleTimer
                    ref={ref => {
                        this.idleTimer = ref
                    }}
                    element={document}
                    onIdle={this.onIdle}
                    onActive={this.onActive}
                    timeout={WARN_TIME}
                />
                <IdleTimer
                    ref={ref => {
                        this.idleTimer = ref
                    }}
                    element={document}
                    onIdle={this.onIdle}
                    timeout={LOG_OUT_TIME}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(withRouter(LogOutTimer))