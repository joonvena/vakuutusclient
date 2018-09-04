import React, {Component} from 'react'
import {connect} from 'react-redux';
import {addPost} from '../actions/postActions';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import axios from 'axios';

class form_insuranceclaim extends Component {

    state = {
        profile: {},
        text: ''
    };

    componentWillMount() {
        axios.get("http://localhost:4000/profiili/current")
            .then(res => {
                this.setState({profile: res.data});
            })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({errors: newProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const {user} = this.props.auth;
        const newPost = {
            text: this.state.text,
            userid: this.state.profile._id,
            email: this.state.profile.email
        };
        this.props.addPost(newPost);
        this.setState({text: ''});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <TextAreaFieldGroup
                        placeholder="Kerro vahingosta mahdollisimman yksityiskohtaisesti"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange.bind(this)}
                    />
                </div>
                <button className="btn btn-danger" type="submit">
                    Lisää
                </button>
            </form>

        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {addPost})(form_insuranceclaim);

