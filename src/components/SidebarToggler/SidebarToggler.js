import React from 'react';
import { createComponent } from 'effector-react';
import { sidebar } from '../../redux/store';
import { toggleSidebar } from '../../redux/events/sidebar';

import './SidebarToggler.css';

const SidebarToggler = createComponent(
    sidebar,
    (props, sidebar) => {
        return ( 
            <div className='sidebarToggler' onClick={toggleSidebar}>
                <div>
                    {
                        sidebar
                        ? 'Close sidebar'
                        : 'Show sidebar'
                    }
                </div>
            </div>
         );
    }
)
 
export default SidebarToggler;

sidebar.on(
    toggleSidebar,
    (state, payload) => {
        return !state;
    }
)