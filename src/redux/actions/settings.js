import * as actions from '../actionTypes/settings';

export const toggleSettingsMenu = () => {
    return {
        type: actions.TOGGLE_SETTINGS_MENU
    };
}

export const selectSettingsSection = (section) => {
    return {
        type: actions.SELECT_SETTINGS_SECTION,
        payload: section
    }
}