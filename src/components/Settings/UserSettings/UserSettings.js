import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComponent } from 'effector-react';

import SettingsItem from '../SettingsItem/SettingsItem';

import { user } from '../../../redux/store';

import { signOut } from '../../../redux/events/user';
import { selectSettingsSection } from '../../../redux/events/settings';

import * as settings from '../constants';

const UserSettings = createComponent(
    user,
    (props, user) => { 
        return ( 
            <div className='userSettings'>
                <div className='userAvatar'></div>
                <div className='userInfo'>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                </div>
                <SettingsItem 
                    sectionTitle='RESET PASSWORD'
                    onClick={() => {selectSettingsSection(settings.RESET_PASSWORD)}}
                />
                <SettingsItem 
                    sectionTitle='DELETE ACCOUNT'
                    onClick={() => {selectSettingsSection(settings.DELETE_ACCOUNT)}}
                />
                <SettingsItem 
                    sectionTitle='LOG OUT' 
                    onClick={signOut}
                />
            </div>
        );
    }
)
 
export default UserSettings;

user.on(
    signOut,
    (state, payload) => {
        return null;
    }
)