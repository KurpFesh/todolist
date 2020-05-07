import React, { Component } from 'react';
import firebase from '../../firebase';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        passwordComplexityLevel: null,
        error: {}
    }

    validateRegistrationData = ({ username, email, password, passwordConfirmation }) => {
        if(!(username && email && password && passwordConfirmation)) {
            this.setState({ error: { message: 'Fill in all fields' } });
            return;
        }

        if(!email.match(new RegExp('@', 'g'))) {
            this.setState({ error: { message: 'E-mail is not valid' } });
            return;
        }


        if(password.length < 6) {
            this.setState({ error: { message: 'Password has to be at least 6 charachters long' } });
            return;
        }

        if(password !== passwordConfirmation) {
            this.setState({ error: { message: 'Entered passwords do not match' } });
            return;
        }

        return true;
    }

    onChangeHandle = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmitHandle = (event) => {
        event.preventDefault();
        if(!this.validateRegistrationData(this.state)) {
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then( () => {
            this.setState({
                username: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            });
        })
        .catch(error => {
            console.error(error);
        });        
    }

    render() {
        const { username, email, password, passwordConfirmation } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmitHandle}>
                    <input
                        name='username'
                        value={username}
                        onChange={this.onChangeHandle}
                    />
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
                    <input
                        name='passwordConfirmation'
                        value={passwordConfirmation}
                        onChange={this.onChangeHandle}
                    />
                    <button type='submit'>
                        Register
                    </button>
                </form>
            </div>
        );
    }
}
 
export default Register;