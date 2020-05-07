import React from 'react';

import './Header.css';

import SidebarToggler from '../SidebarToggler/SidebarToggler';
import AddTaskButton from '../AddTaskButton/AddTaskButton';
import Searchbar from '../Searchbar/Searchbar';
import SettingsMenuToggler from '../Settings/SettingsMenuToggler/SettingsMenuToggler';

import GoogleAuth from '../Auth/GoogleAuth';

const Header = () => {
    return ( 
        <div className='header'>
            <SidebarToggler />
            <AddTaskButton />
            <Searchbar />
            <SettingsMenuToggler />
        </div>
     );
}
 
export default Header;