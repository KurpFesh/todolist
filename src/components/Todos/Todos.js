import React, { Component } from 'react';
import { createComponent } from 'effector-react';
import { searchTerm, sidebar } from '../../redux/store';

import './Todos.css';

import TodoHeader from '../TodoHeader/TodoHeader';
import Todolist from '../Todolist/Todolist';
import TodoItem from '../TodoItem/TodoItem';
import SearchResultList from '../SearchResultList/SearchResultList';

const Todos = createComponent(
    { searchTerm, sidebar },
    (props, { searchTerm, sidebar }) => {
        return (
            <div className={`todos${sidebar?' sidebarOn':' sidebarOff'}`}>
                <TodoHeader />
            {
                searchTerm !== null
                ?   <SearchResultList />
                :   <Todolist />
            }
                <TodoItem />
            </div>
        );
    }
); 

export default Todos;