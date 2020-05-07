import React from 'react';

import './SettingsItem.css';

const SettingsItem = (props) => {
    return ( 
        <div className='settingsItem' onClick={props.onClick}>
            <span>{props.sectionTitle}</span>
            <span className='arrow'>>></span>
        </div>
    );
}

export default SettingsItem;