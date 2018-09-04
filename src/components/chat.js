import React, {Component} from "react";
import io from "socket.io-client";
import {connect} from 'react-redux';
import axios from 'axios';
import {Button, Panel} from 'react-bootstrap';

class Chat extends Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
            profile: [],
            message: '',
            messages: [],
            open: false
        };

}


initializeUserSession() {

    console.log(this.state.profile);
    
    this.socket = io('localhost:4001');
    this.socket.on('RECEIVE_MESSAGE', function (data) {
        addMessage(data);
    });

    this.socket.emit('INITIALIZE_USER_SESSION');


    const addMessage = data => {
        this.setState({messages: [...this.state.messages, data]});
    };

this.sendMessage = ev => {
    ev.preventDefault();
    this.socket.emit('SEND_MESSAGE', {
        author: this.state.profile.email,
        message: this.state.message,
        messageid: this.state.messageid
    })

    this.setState({message: ''});
    }
}

componentWillMount() {
    axios.get("http://localhost:4000/profiili/current")
        .then(res => {
            this.setState({profile: res.data});
        })}
    



    render() {
        let chatTitle;
        if (this.state.open) {
            chatTitle = 'Sulje chat'
        } else {
            chatTitle = 'Avaa chat'
        }
        return (

            <div className="chat_frame">
                <Button bsClass="chat_button" onClick={() => this.setState({open: !this.state.open}, this.initializeUserSession.bind(this))}>
                    {chatTitle}
                </Button>
                <br/>
                <Panel id="collapsible-panel" expanded={this.state.open}>
                    <Panel.Collapse className="panel_body_chat">
                        <Panel.Body className="panel_body_chat">
                            <div className="chat_container">
                                <div className="row">
                                    <div className="col-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-title">Vakuutuschat</div>
                                                <hr/>
                                                <div className="messages">
                                                    {this.state.messages.map(message => {
                                                        return (
                                                            <div><b>{message.author}</b>: {message.message}</div>
                                                        )
                                                    })}
                                                </div>

                                            </div>
                                            <div className="card-footer">
                                                <br/>
                                                <form>
                                                <input type="text" placeholder="Viesti" className="form-control"
                                                       value={this.state.message}
                                                       onChange={ev => this.setState({message: ev.target.value})}/>
                                                <br/>
                                                <button type="submit" onClick={this.sendMessage}
                                                        className="btn btn-primary form-control">Lähetä
                                                </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>

        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.users
});

export default connect(mapStateToProps)(Chat)