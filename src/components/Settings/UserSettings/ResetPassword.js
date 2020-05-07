import React, { Component } from 'react';
import { createComponent } from 'effector-react';
import { user } from '../../../redux/store';

const ResetPassword = createComponent(
    user,
    (props, user) => {
        return ( 
            <div>
                <p>
                    {'We will send instructions to this email address:'}
                </p>
                <p>
                    {user.email}
                </p>
                <button>Reset password</button>
            </div>
        );
    }
); 
 
export default ResetPassword;