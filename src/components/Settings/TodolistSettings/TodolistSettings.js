import React from 'react';

import { selectSettingsSection} from '../../../redux/events/settings';

import SettingsItem from '../SettingsItem/SettingsItem';

import * as settings from '../constants';

const TodolistSettings = () => {
    return ( 
        <div>
            <SettingsItem 
                sectionTitle='CHANGE TODOLIST VIEWER'
                onClick={() => selectSettingsSection(settings.CHANGE_TODOLIST_VIEWER)}
            />
            <SettingsItem 
                sectionTitle='DELETE COMPLETED TASKS'
                onClick={() => selectSettingsSection(settings.DELETE_COMPLETED_TASKS)}
            />
            <SettingsItem 
                sectionTitle='DELETE OUTDATED TASKS'
                onClick={() => selectSettingsSection(settings.DELETE_OUTDATED_TASKS)}
            />
        </div>
    );
}
 
export default TodolistSettings;