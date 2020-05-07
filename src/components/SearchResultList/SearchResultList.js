import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodoDropdownItem from '../TodoDropdownItem/TodoDropdownItem';
import TaskItem from '../TaskItem/TaskItem';

import { getSearchedTasks, getSearchedCategories } from '../../redux/selectors';

import './SearchResultList.css';

class SearchResultList extends Component {
    render() { 
        const { tasks, categories } = this.props;
        return ( 
            <div className='searchResultList'>
                {
                    categories.map( category => {
                        return (
                            <TodoDropdownItem 
                                key={category.id}
                                category={category}
                            />
                        )
                    })
                }
                {
                    tasks.map( task => {
                        return (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onClick={() => this.props.selectTask(task)}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: getSearchedTasks(state),
        categories: getSearchedCategories(state)
    }
}
 
export default connect(mapStateToProps)(SearchResultList);