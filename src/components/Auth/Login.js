import React, { Component } from 'react';
import firebase from '../../firebase';

import GoogleAuth from '../Auth/GoogleAuth';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    onChangeHandle = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmitHandle = (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( () => {
            this.setState({ email: '', password: '' });
        })
        .catch(function(error) {});
    }

    render() { 
        const { email, password } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmitHandle}>
                    <input
                        name='email'
                        value={email}
                        onChange={this.onChangeHandle}
                    />
                    <input
                        name='password'
                        value={password}
                        onChange={this.onChangeHandle}
                    />
                    <button type='submit'>
                        Login
                    </button>
                </form>
                <GoogleAuth />
            </div>
        );
    }
}
 
export default Login;