import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createComponent } from 'effector-react';
import firebase from '../../firebase';
import history from '../../history';

import './App.css';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Todos from '../Todos/Todos';

import Login from '../Auth/Login';
import Register from '../Auth/Register';

import { user } from '../../redux/store';
import { setUser, signOut } from '../../redux/events/user';

const Main = () => {
    return (
        <div className='App'>
            <Header />
            <Sidebar />
            <Todos />
        </div>
    );
}

class App extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2');
        firebase.auth().onAuthStateChanged(user => {
            if (user && user.uid) {
                setUser(user);
                history.push('/');
            } else {
                signOut();
                history.push('/login');
            }
        });
    }

    render() {
        const { user } = this.props;
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' render = {
                        () => {
                            return user && user.id
                            ? <Main />
                            : <div>Loading</div>
                        }
                    } />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                </Switch>
            </Router>
        );
    }
}

export default createComponent(
    user,
    (props, user) => <App user={user} />
);

user.on(setUser, (state, payload) => {
    return {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email
    }
});
