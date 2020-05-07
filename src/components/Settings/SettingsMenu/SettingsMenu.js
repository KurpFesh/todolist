import React, { Component } from 'react';
import { createComponent } from 'effector-react';
import { settingsMenu } from '../../../redux/store';
import { selectSettingsSection } from '../../../redux/events/settings';

import MainSettings from '../MainSettings/MainSettings';

import UserSettings from '../UserSettings/UserSettings';
import DeleteAccount from '../UserSettings/DeleteAccount';
import ResetPassword from '../UserSettings/ResetPassword';

import ColorSettings from '../ColorSettings/ColorSettings';

import TodolistSettings from '../TodolistSettings/TodolistSettings';
import ChangeTodolistViewer from '../TodolistSettings/ChangeTodolistViewer';
import DeleteTasks from '../TodolistSettings/DeleteTasks';

import './SettingsMenu.css';

import * as settings from '../constants';

const SettingsMenu = createComponent(
    settingsMenu,
    (props, settingsMenu) => {
        const renderSettingsHeader = (settingsMenu) => {
            let header = 'Settings'
            switch(settingsMenu) {
                case settings.MAIN:
                    header = 'Settings';
                    break;
                case settings.USER:
                    header = 'User profile';
                    break;
                case settings.COLOR:
                    header = 'Color scheme';
                    break;
                case settings.TODOLIST:
                    header = 'Todolist settings';
                    break;
                case settings.DELETE_ACCOUNT:
                    header = 'Delete account';
                    break;
                case settings.RESET_PASSWORD:
                    header = 'Reset password';
                    break;
                case settings.DELETE_COMPLETED_TASKS:
                    header = 'Delete completed tasks';
                    break;
                case settings.DELETE_OUTDATED_TASKS:
                    header = 'Delete outdated tasks';
                    break;
                case settings.CHANGE_TODOLIST_VIEWER:
                    header = 'Change todolist viewer';
                    break;
                default:
                    header = 'Settings';
                    break;
            }
    
            return ( 
                <>
                    { ( settingsMenu===settings.RESET_PASSWORD || settingsMenu===settings.DELETE_ACCOUNT )
                        ?   <span 
                                className='backArrow'
                                onClick={() => selectSettingsSection(settings.USER)}
                            >{'<<'}</span> 
                        :   settingsMenu!==settings.MAIN
                            ? <span 
                                className='backArrow'
                                onClick={() => selectSettingsSection(settings.MAIN)}
                            >{'<<'}</span>
                            : null
                    }
                    <span className='title'>{header}</span>
                </>
            );
        }
    
        const renderSettingsMenu = (settingsMenu) => {
            switch(settingsMenu) {
                case settings.MAIN:
                    return <MainSettings />
                case settings.USER:
                    return <UserSettings />
                case settings.COLOR:
                    return <ColorSettings />
                case settings.TODOLIST:
                    return <TodolistSettings />
                case settings.DELETE_ACCOUNT:
                    return <DeleteAccount />
                case settings.RESET_PASSWORD:
                    return <ResetPassword />
                case settings.DELETE_COMPLETED_TASKS:
                    return <DeleteTasks action={settings.DELETE_COMPLETED_TASKS} />
                case settings.DELETE_OUTDATED_TASKS:
                    return <DeleteTasks action={settings.DELETE_OUTDATED_TASKS} />  
                case settings.CHANGE_TODOLIST_VIEWER:
                    return <ChangeTodolistViewer />
                default:
                    return null
            }
        }
    
        return ( 
            <div className='settingsMenu'>
                <div className='settingsHeader'>
                    { renderSettingsHeader(settingsMenu) }
                </div>
                { renderSettingsMenu(settingsMenu) }
            </div>
        );
    }
);

export default SettingsMenu;

settingsMenu.on(
    selectSettingsSection, 
    (state, payload) => {
        return payload;
    }
);