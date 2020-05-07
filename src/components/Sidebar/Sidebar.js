import React, { Component } from 'react';
import { createComponent } from 'effector-react';
import { sidebar } from '../../redux/store';

import './Sidebar.css';

import CategoryList from '../CategoryList/CategoryList';
import AddCategoryInput from '../AddCategoryInput/AddCategoryInput';

const Sidebar = createComponent(
    sidebar,
    (props, sidebar) => {
        return sidebar && ( 
            <div className='sidebar'>
                <CategoryList />
                <AddCategoryInput />
            </div>
        );
    }
)

export default Sidebar;