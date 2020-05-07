import * as actions from '../actionTypes/search';

export const showSearchResults = (searchTerm) => {
    return {
        type: actions.SHOW_SEARCH_RESULTS,
        payload: searchTerm
    }
}

export const clearSearchResult = () => {
    return {
        type: actions.CLEAR_SEARCH_RESULTS
    }
}