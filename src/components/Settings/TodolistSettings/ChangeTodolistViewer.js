import React, { Component } from 'react';
import { createComponent } from 'effector-react';
import { viewerCategories, selectedViewer } from '../../../redux/store';
import { setViewer } from '../../../redux/events/viewer';

import SettingsItem from '../SettingsItem/SettingsItem';

const ChangeTodolistViewer = createComponent(
    selectedViewer,
    (props, selectedViewer) => {
        return ( 
            <div>
                <SettingsItem
                    sectionTitle='SHOW CATEGORIES'
                    onClick={() => {
                        if(selectedViewer === 'Categories') {
                            return;
                        }
                        setViewer('Categories')
                    }}
                />
                <SettingsItem 
                    sectionTitle='SHOW DEADLINES'
                    onClick={() => {
                        if(selectedViewer === 'Dates') {
                            return;
                        }
                        setViewer('Dates')
                    }}
                />
            </div>
        );
    }
);

export default ChangeTodolistViewer;

selectedViewer.on(
    setViewer, 
    (state, payload) => {
        console.log(payload);
        return payload;
    }
);