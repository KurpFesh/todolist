import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showSearchResults } from '../../redux/actions/search';

import './Searchbar.css';

class Searchbar extends Component {
    state = {
        searchTerm: '',
        isOpened: false
    }

    toggleSearchBar = () => {
        this.setState({ isOpened: !this.state.isOpened});
    }

    search = (searchTerm) => {
        if( this.state.searchTerm !== '' ) {
            const { tasks, categories, showSearchResults } = this.props;
            showSearchResults(searchTerm)
        }
        this.setState({ searchTerm: '',  isOpened: false});
    }

    onClickHandle = (event) => {
        event.preventDefault();
        this.state.isOpened 
        ? this.search(this.state.searchTerm)
        : this.toggleSearchBar()
    }

    onChangeHandle = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { isOpened, searchTerm } = this.state;
        return ( 
            <div className='searchbar'>
            {
                isOpened && 
                <div className='searchForm'>
                    <form onSubmit={() => this.search(searchTerm)}>
                        <input
                            autoFocus
                            value={searchTerm}
                            onChange={this.onChangeHandle}
                        />
                    </form>
                </div>
            }
                <div className={`searchIcon${isOpened?' opened' :' closed'}`} onClick={this.onClickHandle}>🔍 </div> 
            </div>
         );
    }
}

const mapStateToProps = ({ categories, tasks }) => {
    return {
        categories,
        tasks
    }
}
 
export default connect(mapStateToProps, { showSearchResults })(Searchbar);