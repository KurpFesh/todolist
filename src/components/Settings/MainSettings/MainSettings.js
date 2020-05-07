import React, { Component } from 'react';
import { selectSettingsSection } from '../../../redux/events/settings';
import SettingsItem from '../SettingsItem/SettingsItem';

import * as settings from '../constants';

const MainSettings = (props) => {
    return (
        <div>
            <SettingsItem
                sectionTitle='USER PROFILE'
                onClick={() => selectSettingsSection(settings.USER)}
            />
            <SettingsItem 
                sectionTitle='COLOR THEME'
                onClick={() => selectSettingsSection(settings.COLOR)}
            />
            <SettingsItem 
                sectionTitle='TODOLIST SETTINGS'
                onClick={() => selectSettingsSection(settings.TODOLIST)}
            />
        </div>
    );
}

 
export default MainSettings;