import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleSettingsMenu } from '../../../redux/actions/settings';

import SettingsMenu from '../SettingsMenu/SettingsMenu';

import './SettingsMenuToggler.css';

class SettingsMenuToggler extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='settingsMenuToggler'>
                <h4 onClick={this.props.toggleSettingsMenu}>
                    {
                        this.props.settingsMenuOpened
                        ? 'Close '
                        : 'Open '
                    }
                    settings
                </h4>
                {
                    this.props.settingsMenuOpened
                    ? <SettingsMenu />
                    : null
                }
            </div>
         );
    }
}

const mapStateToProps = ({ settingsMenuOpened }) => {
    return {
        settingsMenuOpened
    }
}
 
export default connect(mapStateToProps, { toggleSettingsMenu })(SettingsMenuToggler);