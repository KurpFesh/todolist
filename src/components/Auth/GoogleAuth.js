import React, { Component } from 'react'; 
import { createComponent } from 'effector-react';
import { user } from '../../redux/store';
import { signInWithGoogle, signOut } from '../../redux/events/user';

class GoogleAuth extends Component {

    state={
        isSignedIn: this.props.user
    }

    auth = (user, isAuthenticated) => {
        if(!isAuthenticated) { 
            signInWithGoogle();
            this.setState({ isSignedIn: true });
        } else {
            signOut();
            this.setState({ isSignedIn: false });
        }
    }

    render() {
        const { user } = this.props;
        const isAuthenticated = user && user.id;
        return ( 
            <div>
                <button onClick={() => this.auth(user, isAuthenticated)}>
                    { isAuthenticated ? 'Sign out' : 'Sign in' }
                </button>
            </div>
        );
    }
}
 
export default createComponent(
    { user },
    (props, state) => <GoogleAuth {...props} {...state} />
);